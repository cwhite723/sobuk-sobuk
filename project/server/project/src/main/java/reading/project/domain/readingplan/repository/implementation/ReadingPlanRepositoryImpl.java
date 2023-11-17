package reading.project.domain.readingplan.repository.implementation;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import reading.project.domain.readingplan.dto.response.QReadingPlanResponse;
import reading.project.domain.readingplan.dto.response.ReadingPlanResponse;
import reading.project.domain.readingplan.repository.ReadingPlanRepositoryCustom;

import java.util.List;

import static reading.project.domain.readingplan.entity.QReadingPlan.readingPlan;
import static reading.project.domain.readingplan.entity.ReadingPlan.Status;
import static reading.project.domain.readingplan.entity.ReadingPlan.Status.NOT_CREATED_POST;
import static reading.project.domain.readingplan.entity.ReadingPlan.Status.READING;

@RequiredArgsConstructor
public class ReadingPlanRepositoryImpl implements ReadingPlanRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<ReadingPlanResponse> getReadingPlans(Long memberId, List<Status> statuses) {
        return queryFactory
                .select(new QReadingPlanResponse(
                        readingPlan.id,
                        readingPlan.book.title,
                        readingPlan.book.author,
                        readingPlan.status,
                        readingPlan.startDate,
                        readingPlan.endDate,
                        readingPlan.todayPage,
                        readingPlan.totalPage
                ))
                .from(readingPlan)
                .where(readingPlan.member.id.eq(memberId)
                        .and(readingPlan.status.in(statuses))
                )
                .orderBy(readingPlan.status.asc())
                .fetch();
    }
}
