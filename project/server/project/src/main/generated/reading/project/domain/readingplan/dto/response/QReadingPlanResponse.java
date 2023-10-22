package reading.project.domain.readingplan.dto.response;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.ConstructorExpression;
import javax.annotation.processing.Generated;

/**
 * reading.project.domain.readingplan.dto.response.QReadingPlanResponse is a Querydsl Projection type for ReadingPlanResponse
 */
@Generated("com.querydsl.codegen.DefaultProjectionSerializer")
public class QReadingPlanResponse extends ConstructorExpression<ReadingPlanResponse> {

    private static final long serialVersionUID = -2103442204L;

    public QReadingPlanResponse(com.querydsl.core.types.Expression<Long> planId, com.querydsl.core.types.Expression<String> title, com.querydsl.core.types.Expression<String> creator, com.querydsl.core.types.Expression<reading.project.domain.readingplan.entity.ReadingPlan.Status> status, com.querydsl.core.types.Expression<java.time.LocalDate> startDate, com.querydsl.core.types.Expression<java.time.LocalDate> endDate, com.querydsl.core.types.Expression<Integer> todayPage) {
        super(ReadingPlanResponse.class, new Class<?>[]{long.class, String.class, String.class, reading.project.domain.readingplan.entity.ReadingPlan.Status.class, java.time.LocalDate.class, java.time.LocalDate.class, int.class}, planId, title, creator, status, startDate, endDate, todayPage);
    }

}

