package reading.project.domain.member.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;
import reading.project.domain.member.dto.*;
import reading.project.domain.member.entity.Follow;
import reading.project.domain.member.entity.Member;
import reading.project.domain.member.entity.QMember;

import java.util.List;

import static reading.project.domain.post.entity.QPost.post;
import static reading.project.domain.book.entity.QBook.book;
import static reading.project.domain.readingplan.entity.QReadingPlan.readingPlan;
import static reading.project.domain.member.entity.QFollow.follow;
import static reading.project.domain.member.entity.QMember.member;
import static reading.project.domain.readingplan.entity.ReadingPlan.Status.*;

@Repository
@RequiredArgsConstructor
public class MemberRepositoryImpl implements MemberRepositoryCustom{

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<Follow> findByFollowing(Long id, Member followingMember) {

        return jpaQueryFactory
                .selectFrom(follow)
                .innerJoin(follow.followerId, member).fetchJoin()
                .where(member.id.eq(id), follow.followingId.eq(followingMember))
                .fetch();
    }

    //내가 팔로우하고 있는 사람수
    @Override
    public Long countByFollowers(Long id) {

        QMember m = new QMember("m");

        return jpaQueryFactory
                .select(follow.count())
                .from(follow)
                .where(follow.followerId.id.eq(id))
                .fetchOne();
    }

    //나를 팔로우 하는 사람수
    @Override
    public Long countByFollowings(Long id) {

        QMember m = new QMember("m");

        return jpaQueryFactory
                .select(follow.count())
                .from(follow)
                .where(follow.followingId.id.eq(id))
                .fetchOne();
    }

    //내가 팔로우한 사람들
    @Override
    public Slice<SearchFollow> findByFollowingList(Long id, Long cursorId, Pageable pageable) {

        QMember m = new QMember("m");

        List<SearchFollow> followings = jpaQueryFactory
                .select(new QSearchFollow(follow.id, m.nickname, m.image, m.id))
                .from(m)
                .innerJoin(m.followings, follow)
                .innerJoin(follow.followerId, member)
                .where(member.id.eq(id),followLtCursorId(cursorId))
                .orderBy(follow.id.desc())
                .limit(pageable.getPageSize() + 1)
                .fetch();

        return checkLastPage(followings,pageable);
    }

    //나를 팔로우하는사람들
    @Override
    public Slice<SearchFollow> findByFollowerList(Long id, Long cursorId, Pageable pageable) {

        QMember m = new QMember("m");
        List<SearchFollow> followers = jpaQueryFactory
                .select(new QSearchFollow(follow.id, m.nickname, m.image, m.id))
                .from(m)
                .innerJoin(m.followers, follow)
                .innerJoin(follow.followingId, member)
                .where(member.id.eq(id), followLtCursorId(cursorId))
                .orderBy(follow.id.desc())
                .limit(pageable.getPageSize()+1)
                .fetch();

        return checkLastPage(followers, pageable);

    }

    @Override
    public Slice<InfoPagePostList> findByPostList(Long id, Long cursorId, Pageable pageable) {
        List<InfoPagePostList> postLists = jpaQueryFactory
                .select(new QInfoPagePostList(
                        post.id,
                        book.title,
                        book.author,
                        post.title,
                        post.content,
                        post.comments.size(),
                        post.likes.size()
                        ))
                .from(post)
                .innerJoin(post.member,member)
                .innerJoin(post.book,book)
                .where(member.id.eq(id),postIdLtCursorId(cursorId))
                .orderBy(post.id.desc())
                .limit(pageable.getPageSize()+1)
                .fetch();

        return checkLastPage(postLists, pageable);
    }
    @Override
    public Slice<InfoPageBookmarkList> findByReadingPlanList(Long id, Long cursorId, Pageable pageable) {

        List<InfoPageBookmarkList> bookmarkLists = jpaQueryFactory
                .select(new QInfoPageBookmarkList(
                        readingPlan.id,
                        book.title,
                        book.author,
                        readingPlan.totalPage,
                        readingPlan.todayPage,
                        readingPlan.status
                ))
                .from(readingPlan)
                .innerJoin(readingPlan.book,book)
                .where(readingPlan.member.id.eq(id)
                        ,readingPlanLtCursorId(cursorId))
                .orderBy(readingPlan.id.desc())
                .limit(pageable.getPageSize()+1)
                .fetch();

        return checkLastPage(bookmarkLists, pageable);
    }
    // post 수
    @Override
    public Long countByPostList(Long id) {
        QMember m = new QMember("m");

        return jpaQueryFactory
                .select(post.count())
                .from(post)
                .where(post.member.id.eq(id))
                .fetchOne();
    }
    // 서재 수
    @Override
    public Long countByReadingPlanList(Long id) {
        QMember m = new QMember("m");

        return jpaQueryFactory
                .select(readingPlan.count())
                .from(readingPlan)
                .where(readingPlan.member.id.eq(id))
                .fetchOne();
    }

    private BooleanExpression followLtCursorId(Long cursorId) {
        if(cursorId == null) {
            return null;
        }
        return follow.id.lt(cursorId);
    }

    private BooleanExpression postIdLtCursorId(Long cursorId) {
        if(cursorId == null) {
            return null;
        }
        return post.id.lt(cursorId);
    }

    private BooleanExpression readingPlanLtCursorId(Long cursorId) {
        if(cursorId == null) {
            return null;
        }
        return readingPlan.id.lt(cursorId);
    }


    private <T> Slice<T> checkLastPage(List<T> results, Pageable pageable) {

        boolean hasNext = false;

        if (results.size() > pageable.getPageSize()) {
            hasNext = true;
            results.remove(pageable.getPageSize());
        }
        return new SliceImpl<>(results, pageable, hasNext);
    }
}
