package reading.project.domain.post.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import reading.project.domain.post.dto.request.CommentRequest;
import reading.project.domain.post.service.CommentService;
import reading.project.global.response.ApplicationResponse;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comments")
public class CommentController {
    private final CommentService commentService;

    @PostMapping("/{post-id}")
    @ResponseStatus(CREATED)
    public ApplicationResponse<Long> createComment(@PathVariable("post-id") Long postId,
                                                   @RequestBody CommentRequest request) {
        //TODO: 토큰 받아와서 사용하도록 수정
        Long loginId = 1L;
        commentService.createComment(loginId, postId, request);

        return ApplicationResponse.ok(postId);
    }

    @PatchMapping("/{comment-id}")
    @ResponseStatus(OK)
    public ApplicationResponse<Long> updateComment(@PathVariable("comment-id") Long commentId,
                                                   @RequestBody CommentRequest request) {
        //TODO: 토큰 받아와서 사용하도록 수정
        Long loginId = 1L;
        commentService.updateComment(loginId, commentId, request);

        return ApplicationResponse.ok(commentId);
    }

    @DeleteMapping("/{comment-id}")
    @ResponseStatus(OK)
    public ApplicationResponse<Void> deleteComment(@PathVariable("comment-id") Long commentId) {
        //TODO: 토큰 받아와서 사용하도록 수정
        Long loginId = 1L;
        commentService.deleteComment(loginId, commentId);

        return ApplicationResponse.noData();
    }
}
