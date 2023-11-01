package reading.project.domain.readingplan.repository;

import reading.project.domain.readingplan.dto.response.ReadingPlanResponse;
import reading.project.domain.readingplan.entity.ReadingPlan;

import java.util.List;

import static reading.project.domain.readingplan.entity.ReadingPlan.*;

public interface ReadingPlanRepositoryCustom {
    List<ReadingPlanResponse> getReadingPlans(Long memberId, List<Status> statuses);
}
