package reading.project.domain.post.repository.implementation;

import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.aspectj.weaver.ast.Or;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import reading.project.domain.member.entity.QMember;
import reading.project.domain.post.dto.request.SortType;
import reading.project.domain.post.dto.response.PostDetailResponse;
import reading.project.domain.post.dto.response.PostResponse;
import reading.project.domain.post.dto.response.QPostDetailResponse;
import reading.project.domain.post.dto.response.QPostResponse;
import reading.project.domain.post.repository.PostRepositoryCustom;

import java.util.List;

import static reading.project.domain.book.entity.QBook.book;
import static reading.project.domain.member.entity.QMember.member;
import static reading.project.domain.post.entity.QComment.comment;
import static reading.project.domain.post.entity.QLike.like;
import static reading.project.domain.post.entity.QPost.post;
import static reading.project.domain.readingplan.entity.QReadingPlan.readingPlan;

@RequiredArgsConstructor
public class PostRepositoryImpl implements PostRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public PostDetailResponse getPostById(Long memberId, Long postId) {
        return queryFactory
                .select(new QPostDetailResponse(
                        member.id,
                        member.userName,
                        member.nickname,
                        book.id,
                        book.title,
                        book.author,
                        readingPlan.startDate,
                        readingPlan.endDate,
                        post.title,
                        post.content,
                        post.comments.size(),
                        post.likes.size(),
                        post.createdAt,
                        post.updatedAt,
                        Expressions.asBoolean(queryFactory
                                .selectFrom(post)
                                .where(post.id.eq(postId),
                                        post.member.id.eq(memberId))
                                .limit(1)
                                .fetchOne() != null),
                        Expressions.asBoolean(queryFactory
                                .selectFrom(like)
                                .where(like.post.id.eq(postId),
                                        like.member.id.eq(memberId))
                                .limit(1)
                                .fetchOne() != null)
                ))
                .from(post)
                .where(post.id.eq(postId))
                .innerJoin(post.member, member)
                .innerJoin(post.book, book)
                .innerJoin(post.readingPlan, readingPlan)
                .fetchOne();
    }

    @Override
    public Page<PostResponse> getPosts(Long loginId, Pageable pageable, SortType sortType) {
        List<PostResponse> responses = queryFactory
                .select(new QPostResponse(
                        member.id,
                        member.userName,
                        member.nickname,
                        book.title,
                        book.author,
                        post.id,
                        post.title,
                        post.content,
                        post.comments.size(),
                        post.likes.size(),
                        post.createdAt,
                        post.updatedAt
                ))
                .from(post)
                .innerJoin(post.member, member)
                .innerJoin(post.book, book)
                .orderBy(postSort(sortType))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        Long count = queryFactory
                .select(post.count())
                .from(post)
                .fetchOne();

        return new PageImpl<>(responses, pageable, count == null ? 0 : count);
    }

    private OrderSpecifier<?> postSort(SortType sortType) {
        switch (sortType) {
            case DATE:
                return new OrderSpecifier<>(Order.DESC, post.createdAt);
            case LIKE:
                return new OrderSpecifier<>(Order.DESC, post.likes.size());
            case COMMENT:
                return new OrderSpecifier<>(Order.DESC, post.comments.size());
        }

        return new OrderSpecifier<>(Order.DESC, post.createdAt);
    }
}
