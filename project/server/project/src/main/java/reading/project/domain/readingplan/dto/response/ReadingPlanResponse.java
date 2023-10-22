package reading.project.domain.readingplan.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;

import java.time.LocalDate;

import static reading.project.domain.readingplan.entity.ReadingPlan.Status;

@Getter
public class ReadingPlanResponse {
    private Long planId;
    private String title;
    private String creator;
    private Status status;
    private LocalDate startDate;
    private LocalDate endDate;
    private int todayPage;

    @QueryProjection
    public ReadingPlanResponse(Long planId, String title, String creator, Status status, LocalDate startDate, LocalDate endDate, int todayPage) {
        this.planId = planId;
        this.title = title;
        this.creator = creator;
        this.status = status;
        this.startDate = startDate;
        this.endDate = endDate;
        this.todayPage = todayPage;
    }
}
