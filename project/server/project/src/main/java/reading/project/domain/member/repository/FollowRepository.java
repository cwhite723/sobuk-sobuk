package reading.project.domain.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import reading.project.domain.member.entity.Follow;


public interface FollowRepository extends JpaRepository<Follow,Long> {
}
