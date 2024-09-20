package reading.project.domain.member.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;

import static reading.project.domain.readingplan.entity.ReadingPlan.Status;
@Getter
public class InfoPageBookmarkList {

    private Long readingPlanId;

    private String title;

    private String author;

    private int totalPage;

    private int todayPage;

    private Status status;
    @QueryProjection
    public InfoPageBookmarkList(Long readingPlanId, String title, String author, int totalPage, int todayPage, Status status) {
        this.readingPlanId = readingPlanId;
        this.title = title;
        this.author = author;
        this.totalPage = totalPage;
        this.todayPage = todayPage;
        this.status = status;
    }
}
