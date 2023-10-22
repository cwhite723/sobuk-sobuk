package reading.project.global.member.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMember is a Querydsl query type for Member
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMember extends EntityPathBase<Member> {

    private static final long serialVersionUID = 583051397L;

    public static final QMember member = new QMember("member1");

    public final ListPath<reading.project.domain.book.entity.Bookmark, reading.project.domain.book.entity.QBookmark> bookmarks = this.<reading.project.domain.book.entity.Bookmark, reading.project.domain.book.entity.QBookmark>createList("bookmarks", reading.project.domain.book.entity.Bookmark.class, reading.project.domain.book.entity.QBookmark.class, PathInits.DIRECT2);

    public final StringPath email = createString("email");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath image = createString("image");

    public final StringPath introduction = createString("introduction");

    public final StringPath nickname = createString("nickname");

    public final StringPath password = createString("password");

    public final EnumPath<Member.Role> role = createEnum("role", Member.Role.class);

    public final StringPath userName = createString("userName");

    public QMember(String variable) {
        super(Member.class, forVariable(variable));
    }

    public QMember(Path<? extends Member> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMember(PathMetadata metadata) {
        super(Member.class, metadata);
    }

}

