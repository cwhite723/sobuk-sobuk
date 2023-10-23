package reading.project.domain.readingplan.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import reading.project.domain.readingplan.entity.ReadingPlan;

public interface ReadingPlanRepository extends JpaRepository<ReadingPlan, Long> {
}
