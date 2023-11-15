package reading.project.domain.post.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import reading.project.domain.book.dto.response.BookResponse;
import reading.project.domain.book.service.BookService;
import reading.project.domain.post.dto.request.PostRequest;
import reading.project.domain.post.dto.request.SortType;
import reading.project.domain.post.dto.response.CommentResponse;
import reading.project.domain.post.dto.response.GetPostDetailResponse;
import reading.project.domain.post.dto.response.PostDetailResponse;
import reading.project.domain.post.dto.response.PostResponse;
import reading.project.domain.post.service.CommentService;
import reading.project.domain.post.service.PostService;
import reading.project.global.page.CommonPageRequest;
import reading.project.global.response.ApplicationResponse;

import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/posts")
public class PostController {
    private final PostService postService;
    private final CommentService commentService;

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

    @GetMapping("/{post-id}")
    @ResponseStatus(OK)
    public ApplicationResponse<GetPostDetailResponse> getPostById(@PathVariable("post-id") Long postId) {
        //TODO: 토큰 받아와서 사용하도록 수정
        Long loginId = 1L;
        PostDetailResponse postResponse = postService.getPostById(loginId, postId);
        List<CommentResponse> commentResponses = commentService.getCommentsByPostId(loginId, postId);

        return ApplicationResponse.ok(new GetPostDetailResponse(postResponse, commentResponses));
    }

    @GetMapping
    @ResponseStatus(OK)
    public ApplicationResponse<Page<PostResponse>> getPosts(CommonPageRequest pageRequest, SortType sortType) {
        //TODO: 토큰 받아와서 사용하도록 수정
        Long loginId = 1L;
        Page<PostResponse> responses = postService.getPosts(loginId, pageRequest.of(), sortType);

        return ApplicationResponse.ok(responses);
    }

    @PostMapping("/{post-id}/like")
    @ResponseStatus(OK)
    public ApplicationResponse<Void> toggleLike(@PathVariable("post-id") Long postId) {
        //TODO: 토큰 받아와서 사용하도록 수정
        Long loginId = 1L;
        postService.toggleLike(loginId, postId);

        return ApplicationResponse.noData();
    }
}
