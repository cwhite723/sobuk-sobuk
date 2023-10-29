package reading.project.domain.post.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import reading.project.domain.post.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
