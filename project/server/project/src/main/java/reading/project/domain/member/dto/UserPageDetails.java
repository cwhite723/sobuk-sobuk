package reading.project.domain.member.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class UserPageDetails {

    private String nickname;

    private String userName;

    private String introduction;

    private String image;

    private Long countBookMark;

    private Long countPost;

    private boolean isFollowing;

    @Builder
    public UserPageDetails(String nickname, String userName, String introduction, String image, Long countBookMark, Long countPost, boolean isFollowing) {
        this.nickname = nickname;
        this.userName = userName;
        this.introduction = introduction;
        this.image = image;
        this.countBookMark = countBookMark;
        this.countPost = countPost;
        this.isFollowing = isFollowing;
    }
}
