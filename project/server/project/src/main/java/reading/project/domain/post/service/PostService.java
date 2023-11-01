package reading.project.domain.post.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reading.project.domain.post.dto.request.PostRequest;
import reading.project.domain.post.entity.Like;
import reading.project.domain.post.entity.Post;
import reading.project.domain.post.repository.LikeRepository;
import reading.project.domain.post.repository.PostRepository;
import reading.project.domain.readingplan.entity.ReadingPlan;
import reading.project.domain.readingplan.service.ReadingPlanService;
import reading.project.global.exception.CustomException;
import reading.project.domain.member.entity.Member;
import reading.project.domain.member.service.MemberService;

import java.util.Optional;

import static reading.project.global.exception.ErrorCode.NOT_CREATOR;
import static reading.project.global.exception.ErrorCode.NOT_FOUND_POST;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PostService {
    private final PostRepository postRepository;
    private final LikeRepository likeRepository;
    private final MemberService memberService;
    private final ReadingPlanService planService;

    @Transactional
    public Long createPost(Long loginId, Long planId, PostRequest request) {
        Member member = memberService.findExistsMember(loginId);
        ReadingPlan plan = planService.findReadingPlanById(planId);
        Post post = request.toEntity(plan, member);

        return postRepository.save(post).getId();
    }

    @Transactional
    public void updatePost(Long loginId, Long postId, PostRequest request) {
        Post post = findPostById(postId);
        validateCreator(loginId, post.getMember().getId());

        post.update(request.getTitle(), request.getContent());
    }

    @Transactional
    public void deletePost(Long loginId, Long postId) {
        Post post = findPostById(postId);
        validateCreator(loginId, post.getMember().getId());

        postRepository.delete(post);
    }

    @Transactional
    public void toggleLike(Long loginId, Long postId) {
        Post post = findPostById(postId);
        Member member = memberService.findExistsMember(loginId);

        Optional<Like> like = likeRepository.findByPostIdAndMemberId(postId, loginId);
        if (like.isPresent()) {
            likeRepository.delete(like.get());
        } else {
            likeRepository.save(Like.of(post, member));
        }
    }

    private void validateCreator(Long loginId, Long creatorId) {
        if (!loginId.equals(creatorId)) {
            throw new CustomException(NOT_CREATOR);
        }
    }

    public Post findPostById(Long postId) {

        return postRepository.findById(postId)
                .orElseThrow(() -> new CustomException(NOT_FOUND_POST));
    }
}
