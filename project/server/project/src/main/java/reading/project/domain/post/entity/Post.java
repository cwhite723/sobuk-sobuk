package reading.project.domain.post.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import reading.project.domain.book.entity.Book;
import reading.project.domain.member.entity.Member;
import reading.project.domain.readingplan.entity.ReadingPlan;
import reading.project.global.base.BaseEntity;

import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.CascadeType.PERSIST;
import static jakarta.persistence.FetchType.*;
import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;
import static org.hibernate.annotations.OnDeleteAction.CASCADE;

@Getter
@NoArgsConstructor(access = PROTECTED)
@Table(name = "posts")
@Entity
public class Post extends BaseEntity {
    @Id
    @Column(name = "post_id")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String content;

    @MapsId
    @OneToOne(fetch = LAZY)
    private ReadingPlan readingPlan;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;

    @OnDelete(action = CASCADE)
    @OneToMany(mappedBy = "post", cascade = PERSIST)
    private List<Comment> comments = new ArrayList<>();

    @OnDelete(action = CASCADE)
    @OneToMany(mappedBy = "post", cascade = PERSIST)
    private List<Like> likes = new ArrayList<>();

    @Builder
    public Post(String title, String content, ReadingPlan readingPlan, Member member, Book book) {
        this.title = title;
        this.content = content;
        this.readingPlan = readingPlan;
        this.member = member;
        this.book = book;
    }

    public void update(String title, String content) {
        this.title = title;
        this.content = content;
    }
}
