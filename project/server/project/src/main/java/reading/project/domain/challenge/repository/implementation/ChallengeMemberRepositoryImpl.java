package reading.project.domain.challenge.repository.implementation;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import reading.project.domain.challenge.dto.response.ChallengeMemberInfo;
import reading.project.domain.challenge.dto.response.QChallengeMemberInfo;
import reading.project.domain.challenge.repository.ChallengeMemberRepositoryCustom;

import java.util.List;

import static reading.project.domain.challenge.entity.QChallengeMember.challengeMember;
import static reading.project.domain.member.entity.QMember.member;

@RequiredArgsConstructor
public class ChallengeMemberRepositoryImpl implements ChallengeMemberRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<ChallengeMemberInfo> getParticipants(Long challengeId) {
        return queryFactory
                .select(new QChallengeMemberInfo(
                        member.id,
                        member.nickname,
                        member.introduction,
                        challengeMember.host,
                        challengeMember.success
                ))
                .from(challengeMember)
                .where(challengeMember.challenge.id.eq(challengeId))
                .innerJoin(challengeMember.member, member)
                .fetch();
    }
}
