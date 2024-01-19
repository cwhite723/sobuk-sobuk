package reading.project.domain.challenge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import reading.project.domain.challenge.entity.ChallengeMember;

public interface ChallengeMemberRepository extends JpaRepository<ChallengeMember, Long> {
}
