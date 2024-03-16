package reading.project.domain.challenge.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import jakarta.persistence.Column;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class ChallengeDetailResponse {
    private Long bookId;
    private String bookTitle;
    private String bookImage;
    private String genre;
    private LocalDate startDate;
    private LocalDate endDate;
    private String content;
    private double successRate;
    private String hostNickname;
    private Integer countParticipant;
    private boolean host;
    private boolean participant;

    @QueryProjection
    public ChallengeDetailResponse(Long bookId, String bookTitle, String bookImage, String genre, LocalDate startDate, LocalDate endDate, String content, double successRate, String hostNickname, Integer countParticipant, boolean host, boolean participant) {
        this.bookId = bookId;
        this.bookTitle = bookTitle;
        this.bookImage = bookImage;
        this.genre = genre;
        this.startDate = startDate;
        this.endDate = endDate;
        this.content = content;
        this.successRate = successRate;
        this.hostNickname = hostNickname;
        this.countParticipant = countParticipant;
        this.host = host;
        this.participant = participant;
    }
}
