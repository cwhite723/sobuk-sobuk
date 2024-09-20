package reading.project.domain.post.dto.request;

import jakarta.annotation.Nullable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import reading.project.domain.post.entity.Post;
import reading.project.domain.readingplan.entity.ReadingPlan;
import reading.project.domain.member.entity.Member;

import static lombok.AccessLevel.*;

@Getter
@NoArgsConstructor(access = PROTECTED)
public class PostRequest {
    private String title;
    private String content;
    private String imageUrl;

    public Post toEntity(ReadingPlan readingPlan, Member member) {
        return Post.builder()
                .title(title)
                .content(content)
                .imageUrl(imageUrl)
                .readingPlan(readingPlan)
                .member(member)
                .book(readingPlan.getBook())
                .build();
    }
}
