package reading.project.domain.post.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reading.project.domain.post.dto.request.CommentRequest;
import reading.project.domain.post.dto.response.CommentResponse;
import reading.project.domain.post.entity.Comment;
import reading.project.domain.post.entity.Post;
import reading.project.domain.post.repository.CommentRepository;
import reading.project.global.exception.CustomException;
import reading.project.domain.member.entity.Member;
import reading.project.domain.member.service.MemberService;

import java.util.List;

import static reading.project.global.exception.ErrorCode.*;
import static reading.project.global.exception.ErrorCode.NOT_CREATOR;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CommentService {
    private final CommentRepository commentRepository;
    private final MemberService memberService;
    private final PostService postService;

    @Transactional
    public void createComment(Long loginId, Long postId, CommentRequest request) {
        Member member = memberService.findExistsMember(loginId);
        Post post = postService.findPostById(postId);

        commentRepository.save(Comment.of(request.getContent(), member, post));
    }

    @Transactional
    public void updateComment(Long loginId, Long commentId, CommentRequest request) {
        Comment comment = findCommentById(commentId);
        validateCreator(loginId, comment.getMember().getId());

        comment.update(request.getContent());
    }

    @Transactional
    public void deleteComment(Long loginId, Long commentId) {
        Comment comment = findCommentById(commentId);
        validateCreator(loginId, comment.getMember().getId());

        commentRepository.delete(comment);
    }

    private Comment findCommentById(Long commentId) {
        return commentRepository.findById(commentId)
                .orElseThrow(() -> new CustomException(NOT_FOUND_COMMENT));
    }

    private void validateCreator(Long loginId, Long creatorId) {
        if (!loginId.equals(creatorId)) {
            throw new CustomException(NOT_CREATOR);
        }
    }

    public List<CommentResponse> getCommentsByPostId(Long loginId, Long postId) {
        return commentRepository.getComments(postId);
    }
}
