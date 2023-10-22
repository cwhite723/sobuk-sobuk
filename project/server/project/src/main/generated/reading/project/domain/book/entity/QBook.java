package reading.project.domain.book.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QBook is a Querydsl query type for Book
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QBook extends EntityPathBase<Book> {

    private static final long serialVersionUID = 1103633250L;

    public static final QBook book = new QBook("book");

    public final reading.project.global.base.QBaseEntity _super = new reading.project.global.base.QBaseEntity(this);

    public final StringPath author = createString("author");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final BooleanPath isUserInput = createBoolean("isUserInput");

    public final NumberPath<Integer> pageNumber = createNumber("pageNumber", Integer.class);

    public final DatePath<java.time.LocalDate> publicationDate = createDate("publicationDate", java.time.LocalDate.class);

    public final StringPath publisher = createString("publisher");

    public final ListPath<reading.project.domain.readingplan.entity.ReadingPlan, reading.project.domain.readingplan.entity.QReadingPlan> readingPlans = this.<reading.project.domain.readingplan.entity.ReadingPlan, reading.project.domain.readingplan.entity.QReadingPlan>createList("readingPlans", reading.project.domain.readingplan.entity.ReadingPlan.class, reading.project.domain.readingplan.entity.QReadingPlan.class, PathInits.DIRECT2);

    public final StringPath title = createString("title");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QBook(String variable) {
        super(Book.class, forVariable(variable));
    }

    public QBook(Path<? extends Book> path) {
        super(path.getType(), path.getMetadata());
    }

    public QBook(PathMetadata metadata) {
        super(Book.class, metadata);
    }

}

