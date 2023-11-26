package reading.project.domain.post.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class PostResponse {
    /*
     * Member Info (memberId, nickname, username, followStatus)
     * Book Info (title, author, image)
     * Post Info (postId, title, content)
     * countLikes, countComments;
     * following filter
     * sortType = createdAt_desc, countComments_desc, countLikes_desc
     * */
    private Long memberId;
    private String userName;
    private String nickname;
    private String bookTitle;
    private String bookAuthor;
    private Long postId;
    private String postTitle;
    private String content;
    private String imageUrl;
    private int countComments;
    private int countLikes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @QueryProjection
    public PostResponse(Long memberId, String userName, String nickname, String bookTitle, String bookAuthor, Long postId, String postTitle, String content, String imageUrl, int countComments, int countLikes, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.memberId = memberId;
        this.userName = userName;
        this.nickname = nickname;
        this.bookTitle = bookTitle;
        this.bookAuthor = bookAuthor;
        this.postId = postId;
        this.postTitle = postTitle;
        this.content = content;
        this.imageUrl = imageUrl;
        this.countComments = countComments;
        this.countLikes = countLikes;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
