package reading.project.domain.book.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import reading.project.domain.readingplan.entity.ReadingPlan;
import reading.project.global.base.BaseEntity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.hibernate.annotations.OnDeleteAction.CASCADE;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "books")
@Entity
public class Book extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    @Column(name = "page_number")
    private int pageNumber;

    @Column(name = "is_user_input")
    private boolean isUserInput;

    @OnDelete(action = CASCADE)
    @OneToMany(mappedBy = "book", cascade = CascadeType.PERSIST)
    private List<ReadingPlan> readingPlans = new ArrayList<>();

    @Builder
    public Book(String title, String publisher, String author, LocalDate publicationDate, int pageNumber, boolean isUserInput) {
        this.title = title;
        this.publisher = publisher;
        this.author = author;
        this.publicationDate = publicationDate;
        this.pageNumber = pageNumber;
        this.isUserInput = isUserInput;
    }

    public void update(String title, String publisher, String author, LocalDate publicationDate, int pageNumber, boolean isUserInput) {
        this.title = title;
        this.publisher = publisher;
        this.author = author;
        this.publicationDate = publicationDate;
        this.pageNumber = pageNumber;
        this.isUserInput = isUserInput;
    }
}
