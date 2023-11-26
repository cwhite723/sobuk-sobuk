package reading.project.domain.book.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;

@Getter
public class BookResponse {
    private Long bookId;
    private String title;
    private String author;
    private String publisher;
    private String imageUrl;

    @QueryProjection
    public BookResponse(Long bookId, String title, String author, String publisher, String imageUrl) {
        this.bookId = bookId;
        this.title = title;
        this.author = author;
        this.publisher = publisher;
        this.imageUrl = imageUrl;
    }
}
