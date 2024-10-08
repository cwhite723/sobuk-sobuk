package reading.project.domain.challenge.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import reading.project.domain.challenge.dto.response.ChallengeDetailResponse;
import reading.project.domain.challenge.dto.response.ChallengeResponseForMain;
import reading.project.domain.member.entity.Member;

public interface ChallengeRepositoryCustom {
    public ChallengeDetailResponse getChallenge(Long challengeId, Long loginId);
    Page<ChallengeResponseForMain> findAllChallenges(Long loginId, Pageable pageable);
    Page<ChallengeResponseForMain> findMyChallenges(Long loginId, Pageable pageable);
}
