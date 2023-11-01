package reading.project.domain.post.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import reading.project.domain.post.dto.request.PostRequest;
import reading.project.domain.post.service.PostService;
import reading.project.global.response.ApplicationResponse;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/posts")
public class PostController {
    private final PostService postService;

    @PostMapping("/{plan-id}")
    @ResponseStatus(CREATED)
    public ApplicationResponse<Long> createPost(@PathVariable("plan-id") Long planId,
                                                @RequestBody PostRequest request) {
        //TODO: 토큰 받아와서 사용하도록 수정
        Long loginId = 1L;
        Long postId = postService.createPost(loginId, planId, request);

        return ApplicationResponse.ok(postId);
    }

    @PatchMapping("/{post-id}")
    @ResponseStatus(OK)
    public ApplicationResponse<Long> updatePost(@PathVariable("post-id") Long postId,
                                                @RequestBody PostRequest request) {
        //TODO: 토큰 받아와서 사용하도록 수정
        Long loginId = 1L;
        postService.updatePost(loginId, postId, request);

        return ApplicationResponse.ok(postId);
    }

    @DeleteMapping("/{post-id}")
    @ResponseStatus(OK)
    public ApplicationResponse<Void> deletePost(@PathVariable("post-id") Long postId) {
        //TODO: 토큰 받아와서 사용하도록 수정
        Long loginId = 1L;
        postService.deletePost(loginId, postId);

        return ApplicationResponse.noData();
    }

//    @GetMapping("/{post-id}")
//    @ResponseStatus(OK)
//    public ApplicationResponse<GetPostResponse> getPost(@PathVariable("post-id") Long postId) {
//
//    }

    @PostMapping("/{post-id}/like")
    @ResponseStatus(OK)
    public ApplicationResponse<Void> toggleLike(@PathVariable("post-id") Long postId) {
        //TODO: 토큰 받아와서 사용하도록 수정
        Long loginId = 1L;
        postService.toggleLike(loginId, postId);

        return ApplicationResponse.noData();
    }
}
