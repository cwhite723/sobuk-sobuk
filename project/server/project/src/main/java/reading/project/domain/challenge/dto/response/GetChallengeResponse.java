package reading.project.domain.challenge.dto.response;

import lombok.Getter;

import java.util.List;

@Getter
public class GetChallengeResponse {
    private final ChallengeDetailResponse challengeDetailResponse;
    private final List<ChallengeMemberInfo> challengeMemberInfoList;

    public GetChallengeResponse(ChallengeDetailResponse challengeDetailResponse, List<ChallengeMemberInfo> challengeMemberInfoList) {
        this.challengeDetailResponse = challengeDetailResponse;
        this.challengeMemberInfoList = challengeMemberInfoList;
    }
}
