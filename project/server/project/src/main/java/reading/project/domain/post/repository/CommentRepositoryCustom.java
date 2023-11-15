package reading.project.domain.post.repository;

import reading.project.domain.post.dto.response.CommentResponse;

import java.util.List;

public interface CommentRepositoryCustom {
    List<CommentResponse> getComments(Long loginId, Long postId);
}
