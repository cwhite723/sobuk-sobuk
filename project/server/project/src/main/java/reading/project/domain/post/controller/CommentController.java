package reading.project.domain.post.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import reading.project.domain.auth.interceptor.JwtParseInterceptor;
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
        Long loginId = JwtParseInterceptor.getAuthenticatedUserId();
        commentService.createComment(loginId, postId, request);

        return ApplicationResponse.ok(postId);
    }

    @PatchMapping("/{comment-id}")
    @ResponseStatus(OK)
    public ApplicationResponse<Long> updateComment(@PathVariable("comment-id") Long commentId,
                                                   @RequestBody CommentRequest request) {
        Long loginId = JwtParseInterceptor.getAuthenticatedUserId();
        commentService.updateComment(loginId, commentId, request);

        return ApplicationResponse.ok(commentId);
    }

    @DeleteMapping("/{comment-id}")
    @ResponseStatus(OK)
    public ApplicationResponse<Void> deleteComment(@PathVariable("comment-id") Long commentId) {
        Long loginId = JwtParseInterceptor.getAuthenticatedUserId();
        commentService.deleteComment(loginId, commentId);

        return ApplicationResponse.noData();
    }
}
