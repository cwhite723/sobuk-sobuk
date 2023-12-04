package reading.project.domain.readingplan.repository.implementation;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import reading.project.domain.readingplan.dto.response.QReadingPlanResponse;
import reading.project.domain.readingplan.dto.response.ReadingPlanResponse;
import reading.project.domain.readingplan.repository.ReadingPlanRepositoryCustom;

import java.util.List;

import static reading.project.domain.book.entity.QBook.book;
import static reading.project.domain.readingplan.entity.QReadingPlan.readingPlan;
import static reading.project.domain.readingplan.entity.ReadingPlan.Status;

@RequiredArgsConstructor
public class ReadingPlanRepositoryImpl implements ReadingPlanRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<ReadingPlanResponse> getReadingPlans(Long memberId, List<Status> statuses) {
        return queryFactory
                .select(new QReadingPlanResponse(
                        readingPlan.id,
                        book.title,
                        book.author,
                        book.imageUrl,
                        readingPlan.status,
                        readingPlan.startDate,
                        readingPlan.endDate,
                        readingPlan.todayPage,
                        readingPlan.readPageNumber,
                        readingPlan.totalPage
                ))
                .from(readingPlan)
                .innerJoin(readingPlan.book, book)
                .where(readingPlan.member.id.eq(memberId)
                        .and(readingPlan.status.in(statuses))
                )
                .orderBy(readingPlan.status.asc())
                .fetch();
    }
}
