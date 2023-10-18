package reading.project.domain.record.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import reading.project.domain.record.entity.Record;

public interface RecordRepository extends JpaRepository<Record, Long> {
}
