package reading.project.domain.book.repository.implementation;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import io.micrometer.common.util.StringUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import reading.project.domain.book.dto.request.FilterCondition;
import reading.project.domain.book.dto.response.BookDetailResponse;
import reading.project.domain.book.dto.response.BookResponse;
import reading.project.domain.book.dto.response.QBookDetailResponse;
import reading.project.domain.book.dto.response.QBookResponse;
import reading.project.domain.book.entity.Book;
import reading.project.domain.book.repository.BookRepositoryCustom;

import java.util.List;

import static reading.project.domain.book.entity.QBook.book;

@RequiredArgsConstructor
public class BookRepositoryImpl implements BookRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public BookDetailResponse getBookDetails(Long bookId) {
        return queryFactory
                .select(new QBookDetailResponse(
                        book.id,
                        book.title,
                        book.publisher,
                        book.author,
                        book.publicationDate,
                        book.createdAt,
                        book.isUserInput
                ))
                .from(book)
                .where(book.id.eq(bookId))
                .fetchOne();
    }

    @Override
    public Page<BookResponse> findBooksByFilterCondition(FilterCondition filterCondition, Pageable pageable) {
        List<BookResponse> responses = queryFactory
                .select(new QBookResponse(
                        book.id,
                        book.title,
                        book.author,
                        book.publisher
                ))
                .from(book)
                .where(searchFilter(filterCondition))
                .orderBy(sortConditions(filterCondition.getSortType()))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        int count = queryFactory
                .selectFrom(book)
                .where(searchFilter(filterCondition))
                .fetch().size();

        return new PageImpl<>(responses, pageable, count);
    }

    private BooleanBuilder searchFilter(FilterCondition filterCondition) {
        BooleanBuilder builder = new BooleanBuilder();

        builder.and(containTitle(filterCondition.getTitle()))
                .and(containAuthor(filterCondition.getAuthor()));

        return builder;
    }

    private BooleanExpression containTitle(String title) {
        if (StringUtils.isBlank(title)) {
            return null;
        }

        return book.title.contains(title);
    }

    private BooleanExpression containAuthor(String author) {
        if (StringUtils.isBlank(author)) {
            return null;
        }

        return book.author.contains(author);
    }

    private OrderSpecifier<?> sortConditions(String sortType) {
        if (StringUtils.isBlank(sortType)) {
            return book.createdAt.desc();
        } else if (sortType.equals("publicationDate")) {
            return book.publicationDate.desc();
        } else if (sortType.equals("bookmarksCount")) {
            return book.bookmarks.size().desc();
        } else if (sortType.equals("readingPlansCount")) {
            return book.readingPlans.size().desc();
        } else {
            return book.createdAt.desc();
        }
    }
}
