package reading.project.domain.book.dto.response;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.ConstructorExpression;
import javax.annotation.processing.Generated;

/**
 * reading.project.domain.book.dto.response.QBookResponse is a Querydsl Projection type for BookResponse
 */
@Generated("com.querydsl.codegen.DefaultProjectionSerializer")
public class QBookResponse extends ConstructorExpression<BookResponse> {

    private static final long serialVersionUID = -777642794L;

    public QBookResponse(com.querydsl.core.types.Expression<Long> bookId, com.querydsl.core.types.Expression<String> title, com.querydsl.core.types.Expression<String> publisher, com.querydsl.core.types.Expression<String> author, com.querydsl.core.types.Expression<java.time.LocalDate> publicationDate, com.querydsl.core.types.Expression<java.time.LocalDateTime> createdAt, com.querydsl.core.types.Expression<Integer> pageNumber, com.querydsl.core.types.Expression<Boolean> isUserInput) {
        super(BookResponse.class, new Class<?>[]{long.class, String.class, String.class, String.class, java.time.LocalDate.class, java.time.LocalDateTime.class, int.class, boolean.class}, bookId, title, publisher, author, publicationDate, createdAt, pageNumber, isUserInput);
    }

}

