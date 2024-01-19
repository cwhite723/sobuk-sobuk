package reading.project.domain.book.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import reading.project.domain.book.entity.Genre;

public interface GenreRepository extends JpaRepository<Genre, Long> {
}
