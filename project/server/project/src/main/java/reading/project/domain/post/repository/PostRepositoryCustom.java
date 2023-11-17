package reading.project.domain.post.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import reading.project.domain.post.dto.request.SortType;
import reading.project.domain.post.dto.response.PostDetailResponse;
import reading.project.domain.post.dto.response.PostResponse;

public interface PostRepositoryCustom {
    PostDetailResponse getPostById(Long memberId, Long postId);
    Page<PostResponse> getPosts(Long loginId, Pageable pageable, SortType sortType);
}
