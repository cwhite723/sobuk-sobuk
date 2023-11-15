package reading.project.domain.member.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;

@Getter
public class SearchFollow {

    private long id;
    private String nickName;
    private String image;
    private long memberId;

    @QueryProjection
    public SearchFollow(long id, String nickName, String image, long memberId) {
        this.id = id;
        this.nickName = nickName;
        this.image = image;
        this.memberId = memberId;
    }
}
