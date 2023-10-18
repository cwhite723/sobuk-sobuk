package reading.project.domain.record.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;

import java.time.LocalDate;

import static reading.project.domain.record.entity.Record.Status;

@Getter
public class RecordResponse {
    private Long recordId;
    private String title;
    private String author;
    private Status status;
    private LocalDate startDate;
    private LocalDate endDate;
    private int todayPage;

    @QueryProjection
    public RecordResponse(Long recordId, String title, String author, Status status, LocalDate startDate, LocalDate endDate, int todayPage) {
        this.recordId = recordId;
        this.title = title;
        this.author = author;
        this.status = status;
        this.startDate = startDate;
        this.endDate = endDate;
        this.todayPage = todayPage;
    }
}
