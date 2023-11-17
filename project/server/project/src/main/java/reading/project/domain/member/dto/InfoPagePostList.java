package reading.project.domain.member.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;

@Getter
public class InfoPagePostList {

    private long postId;
    private String bookTitle;
    private String author;
    private String title;
    private String content;
    private int countComment;
    private int countLike;


    @QueryProjection
    public InfoPagePostList(long postId, String bookTitle, String author,
                            String title, String content, int countComment, int countLike) {
        this.postId = postId;
        this.bookTitle = bookTitle;
        this.author = author;
        this.title = title;
        this.content = content;
        this.countComment = countComment;
        this.countLike = countLike;
    }

}