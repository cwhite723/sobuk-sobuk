package reading.project.domain.readingplan.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QReadingPlan is a Querydsl query type for ReadingPlan
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QReadingPlan extends EntityPathBase<ReadingPlan> {

    private static final long serialVersionUID = 1997720694L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QReadingPlan readingPlan = new QReadingPlan("readingPlan");

    public final reading.project.global.base.QBaseEntity _super = new reading.project.global.base.QBaseEntity(this);

    public final reading.project.domain.book.entity.QBook book;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final DatePath<java.time.LocalDate> endDate = createDate("endDate", java.time.LocalDate.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final reading.project.global.member.entity.QMember member;

    public final NumberPath<Integer> pagesPerDay = createNumber("pagesPerDay", Integer.class);

    public final NumberPath<Integer> readPageNumber = createNumber("readPageNumber", Integer.class);

    public final DatePath<java.time.LocalDate> startDate = createDate("startDate", java.time.LocalDate.class);

    public final EnumPath<ReadingPlan.Status> status = createEnum("status", ReadingPlan.Status.class);

    public final NumberPath<Integer> todayPage = createNumber("todayPage", Integer.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QReadingPlan(String variable) {
        this(ReadingPlan.class, forVariable(variable), INITS);
    }

    public QReadingPlan(Path<? extends ReadingPlan> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QReadingPlan(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QReadingPlan(PathMetadata metadata, PathInits inits) {
        this(ReadingPlan.class, metadata, inits);
    }

    public QReadingPlan(Class<? extends ReadingPlan> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.book = inits.isInitialized("book") ? new reading.project.domain.book.entity.QBook(forProperty("book")) : null;
        this.member = inits.isInitialized("member") ? new reading.project.global.member.entity.QMember(forProperty("member")) : null;
    }

}

