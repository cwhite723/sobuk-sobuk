package reading.project.domain.book.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.annotation.Nullable;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import reading.project.domain.book.entity.Book;
import reading.project.domain.book.entity.Genre;

import java.time.LocalDate;

import static lombok.AccessLevel.*;

@Getter
@NoArgsConstructor(access = PROTECTED)
public class BookRequest {
    private String title;
    private String publisher;
    private String author;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDate publicationDate;
    private boolean isUserInput;
    private String imageUrl;
    private Long genreId;

    public Book toEntity(Genre genre) {
        return Book.builder()
                .title(title)
                .publisher(publisher)
                .author(author)
                .publicationDate(publicationDate)
                .isUserInput(isUserInput)
                .imageUrl(imageUrl)
                .genre(genre)
                .build();
    }
}
