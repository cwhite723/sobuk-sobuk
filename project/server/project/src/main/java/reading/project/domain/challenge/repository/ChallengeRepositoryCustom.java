package reading.project.domain.challenge.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import reading.project.domain.challenge.dto.response.ChallengeDetailResponse;
import reading.project.domain.challenge.dto.response.ChallengeResponseForMain;

public interface ChallengeRepositoryCustom {
    public ChallengeDetailResponse getChallenge(Long challengeId, Long loginId);
    Page<ChallengeResponseForMain> findAllChallenges(Pageable pageable);
}
