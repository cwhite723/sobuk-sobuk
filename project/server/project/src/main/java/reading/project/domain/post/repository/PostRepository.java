package reading.project.domain.post.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import reading.project.domain.post.entity.Post;

public interface PostRepository extends JpaRepository<Post, Long>, PostRepositoryCustom {
}
