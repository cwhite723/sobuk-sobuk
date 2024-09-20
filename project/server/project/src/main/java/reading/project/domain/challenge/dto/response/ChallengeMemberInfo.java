package reading.project.domain.challenge.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;

@Getter
public class ChallengeMemberInfo {
    private Long id;
    private String nickname;
    private String introduction;
    private boolean host;
    private boolean success;

    @QueryProjection
    public ChallengeMemberInfo(Long id, String nickname, String introduction, boolean host, boolean success) {
        this.id = id;
        this.nickname = nickname;
        this.introduction = introduction;
        this.host = host;
        this.success = success;
    }
}
