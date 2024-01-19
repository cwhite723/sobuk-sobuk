package reading.project.domain.challenge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import reading.project.domain.challenge.entity.Challenge;

public interface ChallengeRepository extends JpaRepository<Challenge, Long> {
}
