package reading.project.domain.challenge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import reading.project.domain.challenge.entity.ChallengeMember;

import java.util.Optional;

public interface ChallengeMemberRepository extends JpaRepository<ChallengeMember, Long> {
    Optional<ChallengeMember> findByIdAndHostTrue(Long id);
    Optional<ChallengeMember> findByChallengeIdAndMemberId(Long challengeId, Long memberId);
    Long countByChallengeId(Long challengeId);
}
