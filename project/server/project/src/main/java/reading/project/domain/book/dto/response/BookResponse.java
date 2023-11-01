package reading.project.domain.book.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;

@Getter
public class BookResponse {
    private Long bookId;
    private String title;
    private String author;

    @QueryProjection
    public BookResponse(Long bookId, String title, String author) {
        this.bookId = bookId;
        this.title = title;
        this.author = author;
    }
}
