package reading.project.domain.book.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import reading.project.domain.book.entity.Bookmark;

import java.util.Optional;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
    public Optional<Bookmark> findByBookIdAndMemberId(Long bookId, Long memberId);
}
