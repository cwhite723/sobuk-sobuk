package reading.project.domain.member.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class MyPageDetails {

    private String nickname;

    private String userName;

    private String introduction;

    private String image;

    private Long countFollower;

    private Long countFollowing;

    private Long countBookMark;

    private Long countPost;

    @Builder
    public MyPageDetails(String nickname, String userName, String introduction, String image, Long countFollower, Long countFollowing , Long countBookMark , Long countPost) {
        this.nickname = nickname;
        this.userName = userName;
        this.introduction = introduction;
        this.image = image;
        this.countFollower = countFollower;
        this.countFollowing = countFollowing;
        this.countBookMark = countBookMark;
        this.countPost = countPost;
    }
}
