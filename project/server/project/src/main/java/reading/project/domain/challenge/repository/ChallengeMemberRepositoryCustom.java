package reading.project.domain.challenge.repository;

import reading.project.domain.challenge.dto.response.ChallengeMemberInfo;

import java.util.List;

public interface ChallengeMemberRepositoryCustom {
    List<ChallengeMemberInfo> getParticipants(Long challengeId);

}
