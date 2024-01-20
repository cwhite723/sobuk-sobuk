package reading.project.domain.challenge.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import reading.project.domain.book.entity.Book;
import reading.project.domain.challenge.entity.Challenge;

import java.time.LocalDate;

import static lombok.AccessLevel.*;

@Getter
@NoArgsConstructor(access = PROTECTED)
public class ChallengeRequest {
    private String content;
    private int recruitCount;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDate startDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDate endDate;

    public Challenge toEntity(Book book) {
        return Challenge.builder()
                .content(content)
                .recruitCount(recruitCount)
                .startDate(startDate)
                .endDate(endDate)
                .recruitStartDate(LocalDate.now())
                .recruitEndDate(endDate.minusDays(1))
                .book(book)
                .build();
    }
}
