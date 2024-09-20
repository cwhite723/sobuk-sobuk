package reading.project.domain.readingplan.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.boot.context.properties.bind.DefaultValue;
import org.springframework.format.annotation.DateTimeFormat;
import reading.project.domain.book.entity.Book;
import reading.project.domain.readingplan.entity.ReadingPlan;
import reading.project.domain.member.entity.Member;

import java.time.LocalDate;

import static reading.project.domain.readingplan.entity.ReadingPlan.Status;
import static reading.project.domain.readingplan.entity.ReadingPlan.Status.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReadingPlanRequest {
    @NotNull
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate;

    @NotNull
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate endDate;

    @NotNull
    private int totalPage;

    @Min(0)
    private int readPageNumber;

    private Integer challengeId;

    public ReadingPlan toEntity(Member member, Book book) {
        return ReadingPlan.builder()
                .startDate(startDate)
                .endDate(endDate)
                .status(READING)
                .totalPage(totalPage)
                .readPageNumber(readPageNumber)
                .challengeId(challengeId)
                .member(member)
                .book(book)
                .build();
    }
}
