package reading.project.domain.book.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
public class BookDetailResponse {
    private Long bookId;
    private String title;
    private String publisher;
    private String author;
    private LocalDate publicationDate;
    private LocalDateTime createdAt;
    private boolean isUserInput;
    private String imageUrl;
    private Long genreId;
    private String genreName;

    @QueryProjection
    public BookDetailResponse(Long bookId, String title, String publisher, String author, LocalDate publicationDate, LocalDateTime createdAt, boolean isUserInput, String imageUrl, Long genreId, String genreName) {
        this.bookId = bookId;
        this.title = title;
        this.publisher = publisher;
        this.author = author;
        this.publicationDate = publicationDate;
        this.createdAt = createdAt;
        this.isUserInput = isUserInput;
        this.imageUrl = imageUrl;
        this.genreId = genreId;
        this.genreName = genreName;
    }
}
