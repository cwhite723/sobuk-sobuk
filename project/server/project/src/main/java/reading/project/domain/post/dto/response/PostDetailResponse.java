package reading.project.domain.post.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
public class PostDetailResponse {
    /*
     * Member Info (memberId, nickname, username, followStatus)
     * Book Info (bookId, title, author, image)
     * ReadingPlan Info (startDate, endDate)
     * Post Info (title, content)
     * Comment Info (creatorId, nickname, username, content)
     * countLikes, countComments;
     * */
    private Long memberId;
    private String userName;
    private String nickname;
//    private Boolean isFollowing;
    private Long bookId;
    private String bookTitle;
    private String bookAuthor;
    private String genreName;
    private LocalDate startDate;
    private LocalDate endDate;
    private String postTitle;
    private String content;
    private String imageUrl;
    private int countComments;
    private int countLikes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private boolean myPost;
    private boolean myLike;

    @QueryProjection
    public PostDetailResponse(Long memberId, String userName, String nickname, Long bookId, String bookTitle, String bookAuthor, String genreName, LocalDate startDate, LocalDate endDate, String postTitle, String content, String imageUrl, int countComments, int countLikes, LocalDateTime createdAt, LocalDateTime updatedAt, boolean myPost, boolean myLike) {
        this.memberId = memberId;
        this.userName = userName;
        this.nickname = nickname;
//        this.isFollowing = isFollowing;
        this.bookId = bookId;
        this.bookTitle = bookTitle;
        this.bookAuthor = bookAuthor;
        this.genreName = genreName;
        this.startDate = startDate;
        this.endDate = endDate;
        this.postTitle = postTitle;
        this.content = content;
        this.imageUrl = imageUrl;
        this.countComments = countComments;
        this.countLikes = countLikes;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.myPost = myPost;
        this.myLike = myLike;
    }
}
