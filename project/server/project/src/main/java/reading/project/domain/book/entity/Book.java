package reading.project.domain.book.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import reading.project.domain.challenge.entity.Challenge;
import reading.project.domain.post.entity.Post;
import reading.project.domain.readingplan.entity.ReadingPlan;
import reading.project.global.base.BaseEntity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.CascadeType.*;
import static jakarta.persistence.GenerationType.*;
import static lombok.AccessLevel.*;
import static org.hibernate.annotations.OnDeleteAction.CASCADE;

@Getter
@NoArgsConstructor(access = PROTECTED)
@Table(name = "books")
@Entity
public class Book extends BaseEntity {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "book_id", nullable = false, updatable = false)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "publisher")
    private String publisher;

    @Column(name = "author")
    private String author;

    @Column(name = "publication_date")
    private LocalDate publicationDate;

    @Column(name = "is_user_input")
    private boolean isUserInput;

    @Column(name = "image_url")
    private String imageUrl;

    @OnDelete(action = CASCADE)
    @OneToMany(mappedBy = "book", cascade = PERSIST)
    private List<Post> posts = new ArrayList<>();

    @OnDelete(action = CASCADE)
    @OneToMany(mappedBy = "book", cascade = PERSIST)
    private List<ReadingPlan> readingPlans = new ArrayList<>();

    @OnDelete(action = CASCADE)
    @OneToMany(mappedBy = "book", cascade = PERSIST)
    private List<Bookmark> bookmarks = new ArrayList<>();

    @OnDelete(action = CASCADE)
    @OneToMany(mappedBy = "challenge", cascade = PERSIST)
    private List<Challenge> challenges = new ArrayList<>();

    @Builder
    public Book(String title, String publisher, String author, LocalDate publicationDate, boolean isUserInput, String imageUrl) {
        this.title = title;
        this.publisher = publisher;
        this.author = author;
        this.publicationDate = publicationDate;
        this.isUserInput = isUserInput;
        this.imageUrl = imageUrl;
    }

    public void update(String title, String publisher, String author, LocalDate publicationDate, boolean isUserInput) {
        this.title = title;
        this.publisher = publisher;
        this.author = author;
        this.publicationDate = publicationDate;
        this.isUserInput = isUserInput;
    }
}
