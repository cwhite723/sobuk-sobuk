package reading.project.domain.member.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;

@Getter
public class MyPagePostList {

    private long postId;
    private String title;
    private String image;
    private String author;

    private Long countComment;
    private Long countLike;


    @QueryProjection
    public MyPagePostList(long postId, String title, String image, String author) {
        this.postId = postId;
        this.title = title;
        this.image = image;
        this.author = author;
    }

}