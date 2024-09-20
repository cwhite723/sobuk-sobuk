package reading.project.domain.post.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class CommentResponse {
    private Long commentId;
    private Long memberId;
    private String nickname;
    private String userName;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private boolean myComment;

    @QueryProjection
    public CommentResponse(Long commentId, Long memberId, String nickname, String userName, String content, LocalDateTime createdAt, LocalDateTime updatedAt, boolean myComment) {
        this.commentId = commentId;
        this.memberId = memberId;
        this.nickname = nickname;
        this.userName = userName;
        this.content = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.myComment = myComment;
    }
}
