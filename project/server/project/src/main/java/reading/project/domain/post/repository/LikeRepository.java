package reading.project.domain.post.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import reading.project.domain.post.entity.Like;

import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Long> {
    Optional<Like> findByPostIdAndMemberId(Long postId, Long memberId);
}
