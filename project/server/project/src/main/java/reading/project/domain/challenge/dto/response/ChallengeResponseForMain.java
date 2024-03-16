package reading.project.domain.challenge.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class ChallengeResponseForMain {
    private Long bookId;
    private String bookTitle;
    private String bookImage;
    private String genre;
    private LocalDate startDate;
    private LocalDate endDate;
    private double successRate;
    private String hostNickname;
    private Integer countParticipant;

    @QueryProjection
    public ChallengeResponseForMain(Long bookId, String bookTitle, String bookImage, String genre, LocalDate startDate, LocalDate endDate, double successRate, String hostNickname, Integer countParticipant) {
        this.bookId = bookId;
        this.bookTitle = bookTitle;
        this.bookImage = bookImage;
        this.genre = genre;
        this.startDate = startDate;
        this.endDate = endDate;
        this.successRate = successRate;
        this.hostNickname = hostNickname;
        this.countParticipant = countParticipant;
    }
}
