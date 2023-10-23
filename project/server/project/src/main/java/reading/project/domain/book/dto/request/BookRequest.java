package reading.project.domain.book.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import reading.project.domain.book.entity.Book;

import java.time.LocalDate;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BookRequest {
    private String title;
    private String publisher;
    private String author;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDate publicationDate;
    private int pageNumber;
    private boolean isUserInput;

    public Book toEntity() {
        return Book.builder()
                .title(title)
                .publisher(publisher)
                .author(author)
                .publicationDate(publicationDate)
                .pageNumber(pageNumber)
                .isUserInput(isUserInput)
                .build();
    }
}
