package reading.project.domain.book.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import reading.project.global.base.BaseEntity;
import reading.project.domain.member.entity.Member;

import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;
import static org.hibernate.annotations.OnDeleteAction.CASCADE;

@Getter
@NoArgsConstructor(access = PROTECTED)
@Entity
@Table(name = "bookmarks")
public class Bookmark extends BaseEntity {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "bookmark_id")
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "book_id", nullable = false)
    @OnDelete(action = CASCADE)
    private Book book;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    @OnDelete(action = CASCADE)
    private Member member;

    private Bookmark(Book book, Member member) {
        this.book = book;
        this.member = member;
    }

    public static Bookmark of(Book book, Member member) {
        return new Bookmark(book, member);
    }
}
