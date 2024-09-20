package reading.project.domain.book.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;

import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.CascadeType.PERSIST;
import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;
import static org.hibernate.annotations.OnDeleteAction.CASCADE;

@Getter
@NoArgsConstructor(access = PROTECTED)
@Table(name = "genres")
@Entity
public class Genre {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "genre_id", nullable = false, updatable = false)
    private Long id;

    @Column(name = "name")
    private String name;

    @OnDelete(action = CASCADE)
    @OneToMany(mappedBy = "genre", cascade = PERSIST)
    private List<Book> books = new ArrayList<>();
}
