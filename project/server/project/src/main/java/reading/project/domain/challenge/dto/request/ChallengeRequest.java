package reading.project.domain.challenge.dto.request;

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
    private LocalDate startDate;
    private LocalDate endDate;

    public Challenge toEntity(Book book) {
        return Challenge.builder()
                .content(content)
                .recruitCount(recruitCount)
                .startDate(startDate)
                .endDate(endDate)
                .book(book)
                .build();
    }
}
