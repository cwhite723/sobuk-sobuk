package reading.project.domain.book.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import reading.project.domain.book.entity.Book;

import java.util.Optional;

public interface BookRepository extends JpaRepository<Book, Long>, BookRepositoryCustom {
    public Optional<Book> findBookByTitleAndPublisherAndAuthor(String title, String publisher, String author);
}
