package reading.project.domain.readingplan.dto.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import reading.project.domain.book.entity.Book;
import reading.project.domain.readingplan.entity.ReadingPlan;
import reading.project.global.member.entity.Member;

import java.time.LocalDate;

import static reading.project.domain.readingplan.entity.ReadingPlan.Status;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReadingPlanRequest {
    private LocalDate startDate;
    private LocalDate endDate;
    private int readPageNumber;
    private Status status;

    public ReadingPlan toEntity(Member member, Book book) {
        return ReadingPlan.builder()
                .startDate(startDate)
                .endDate(endDate)
                .readPageNumber(readPageNumber)
                .status(status)
                .member(member)
                .book(book)
                .build();
    }
}
