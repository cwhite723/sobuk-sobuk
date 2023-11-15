package reading.project.domain.post.dto.response;

import lombok.Getter;

import java.util.List;

@Getter
public class GetPostDetailResponse {
    private PostDetailResponse postResponse;
    private List<CommentResponse> commentResponses;

    public GetPostDetailResponse(PostDetailResponse postResponse, List<CommentResponse> commentResponses) {
        this.postResponse = postResponse;
        this.commentResponses = commentResponses;
    }
}
