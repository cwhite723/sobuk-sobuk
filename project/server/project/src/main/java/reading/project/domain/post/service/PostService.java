package reading.project.domain.post.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reading.project.domain.post.dto.request.PostRequest;
import reading.project.domain.post.dto.request.SortType;
import reading.project.domain.post.dto.response.PostDetailResponse;
import reading.project.domain.post.dto.response.PostResponse;
import reading.project.domain.post.entity.Like;
import reading.project.domain.post.entity.Post;
import reading.project.domain.post.repository.LikeRepository;
import reading.project.domain.post.repository.PostRepository;
import reading.project.domain.readingplan.entity.ReadingPlan;
import reading.project.domain.readingplan.service.ReadingPlanService;
import reading.project.domain.image.entity.Image;
import reading.project.domain.image.service.ImageService;
import reading.project.global.exception.CustomException;
import reading.project.domain.member.entity.Member;
import reading.project.domain.member.service.MemberService;

import java.util.Optional;

import static reading.project.domain.readingplan.entity.ReadingPlan.Status.*;
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
    private final ImageService imageService;

    @Transactional
    public Long createPost(Long loginId, Long planId, PostRequest request) {
        Member member = memberService.findExistsMember(loginId);
        ReadingPlan plan = planService.findReadingPlanById(planId);
        planService.checkFinishReading(plan);
        Image image = imageService.findImageById(request.getImageId());

        Post post = request.toEntity(image, plan, member);
        plan.changeStatus(COMPLETED);

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

        post.getReadingPlan().changeStatus(NOT_CREATED_POST);

        postRepository.delete(post);
    }

    public PostDetailResponse getPostById(Long loginId, Long postId) {

        return postRepository.getPostById(loginId, postId);
    }

    public Page<PostResponse> getPosts(Long loginId, Pageable pageable, SortType sortType) {

        return postRepository.getPosts(loginId, pageable, sortType);
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
