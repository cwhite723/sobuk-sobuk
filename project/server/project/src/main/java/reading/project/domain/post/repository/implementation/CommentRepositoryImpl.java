package reading.project.domain.post.repository.implementation;

import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import reading.project.domain.post.dto.response.CommentResponse;
import reading.project.domain.post.dto.response.QCommentResponse;
import reading.project.domain.post.repository.CommentRepositoryCustom;

import java.util.List;

import static reading.project.domain.member.entity.QMember.member;
import static reading.project.domain.post.entity.QComment.comment;

@RequiredArgsConstructor
public class CommentRepositoryImpl implements CommentRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<CommentResponse> getComments(Long postId) {
        return queryFactory
                .select(new QCommentResponse(
                        comment.id,
                        member.id,
                        member.nickname,
                        member.userName,
                        comment.content,
                        comment.createdAt,
                        comment.updatedAt,
                        Expressions.asBoolean(queryFactory
                                .selectFrom(comment)
                                .where(comment.post.id.eq(postId),
                                        comment.member.id.eq(1L))
                                .limit(1)
                                .fetchOne() != null)
                ))
                .from(comment)
                .leftJoin(comment.member, member)
                .where(comment.post.id.eq(postId))
                .distinct()
                .fetch();
    }
}
