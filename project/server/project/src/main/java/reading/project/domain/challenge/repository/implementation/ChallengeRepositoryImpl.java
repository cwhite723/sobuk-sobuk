package reading.project.domain.challenge.repository.implementation;

import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import reading.project.domain.challenge.dto.response.ChallengeDetailResponse;
import reading.project.domain.challenge.dto.response.ChallengeResponseForMain;
import reading.project.domain.challenge.dto.response.QChallengeDetailResponse;
import reading.project.domain.challenge.dto.response.QChallengeResponseForMain;
import reading.project.domain.challenge.repository.ChallengeRepositoryCustom;

import java.util.List;

import static reading.project.domain.book.entity.QBook.book;
import static reading.project.domain.book.entity.QGenre.genre;
import static reading.project.domain.challenge.entity.QChallenge.challenge;
import static reading.project.domain.challenge.entity.QChallengeMember.challengeMember;
import static reading.project.domain.member.entity.QMember.member;

@RequiredArgsConstructor
public class ChallengeRepositoryImpl implements ChallengeRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public ChallengeDetailResponse getChallenge(Long challengeId, Long loginId) {
        return queryFactory
                .select(new QChallengeDetailResponse(
                        book.id,
                        book.title,
                        book.imageUrl,
                        genre.name,
                        challenge.startDate,
                        challenge.endDate,
                        challenge.content,
                        challenge.successRate,
                        member.nickname,
                        challenge.challengeMembers.size(),
                        JPAExpressions.selectFrom(challenge)
                                .where(challenge.id.eq(challengeId), challenge.hostId.eq(loginId))
                                .exists(),
                        JPAExpressions.selectFrom(challengeMember)
                                .where(challengeMember.challenge.id.eq(challengeId),
                                        challengeMember.member.id.eq(loginId))
                                .exists()))
                .from(challenge)
                .innerJoin(challenge.book, book)
                .innerJoin(book.genre, genre)
                .innerJoin(member).on(challenge.hostId.eq(member.id))
                .where(challenge.id.eq(challengeId))
                .fetchOne();
    }

    @Override
    public Page<ChallengeResponseForMain> findAllChallenges(Pageable pageable) {
        List<ChallengeResponseForMain> challengeList = queryFactory
                .select(new QChallengeResponseForMain(
                        book.id,
                        book.title,
                        book.imageUrl,
                        genre.name,
                        challenge.startDate,
                        challenge.endDate,
                        challenge.successRate,
                        member.nickname,
                        challenge.challengeMembers.size()
                ))
                .from(challenge)
                .innerJoin(challenge.book, book)
                .innerJoin(book.genre, genre)
                .innerJoin(member).on(challenge.hostId.eq(member.id))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        int count = queryFactory
                .selectFrom(challenge)
                .fetch()
                .size();

        return new PageImpl<>(challengeList, pageable, count);
    }

    @Override
    public Page<ChallengeResponseForMain> findMyChallenges(Long loginId, Pageable pageable) {
        List<ChallengeResponseForMain> challengeList = queryFactory
                .select(new QChallengeResponseForMain(
                        book.id,
                        book.title,
                        book.imageUrl,
                        genre.name,
                        challenge.startDate,
                        challenge.endDate,
                        challenge.successRate,
                        member.nickname,
                        challenge.challengeMembers.size()
                ))
                .from(challenge)
                .where(challengeMember.member.id.eq(loginId))
                .innerJoin(challenge.book, book)
                .innerJoin(book.genre, genre)
                .innerJoin(member).on(challenge.hostId.eq(member.id))
                .innerJoin(challenge.challengeMembers, challengeMember)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        int count = queryFactory
                .selectFrom(challenge)
                .fetch()
                .size();

        return new PageImpl<>(challengeList, pageable, count);
    }
}
