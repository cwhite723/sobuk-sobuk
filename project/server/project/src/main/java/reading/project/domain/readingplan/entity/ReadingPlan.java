package reading.project.domain.readingplan.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import reading.project.domain.book.entity.Book;
import reading.project.domain.member.entity.Member;
import reading.project.domain.post.entity.Post;
import reading.project.global.base.BaseEntity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.CascadeType.PERSIST;
import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;
import static org.hibernate.annotations.OnDeleteAction.CASCADE;

@Getter
@NoArgsConstructor(access = PROTECTED)
@Table(name = "reading_plans")
@Entity
public class ReadingPlan extends BaseEntity {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "reading_plan_id", nullable = false)
    private Long id;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "total_page")
    private int totalPage;

    @Column(name = "read_page_number")
    private int readPageNumber;

    @Column(name = "pages_per_day")
    private int pagesPerDay;

    @Column(name = "today_page")
    private int todayPage;

    @Column(name = "read_status")
    private Status status;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    public enum Status {
        READING("reading"),
        COMPLETED("completed"),
        NOT_CREATED_POST("not_created_post"),
        NOT_STARTED("not_started"),
        OVERDUE("overdue");

        private final String value;

        Status(String value) {
            this.value = value;
        }

        @JsonCreator
        public static Status from(String value) {
            for (Status status : Status.values()) {
                if (status.getValue().equals(value)) {
                    return status;
                }
            }

            return null;
        }

        @JsonValue
        public String getValue() {
            return value;
        }
    }

    @Builder
    public ReadingPlan(LocalDate startDate, LocalDate endDate, int totalPage, int readPageNumber, Status status, Book book, Member member) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.totalPage = totalPage;
        this.readPageNumber = readPageNumber;
        this.status = status;
        this.book = book;
        this.member = member;
    }

    public void update(LocalDate startDate, LocalDate endDate, int totalPage, int readPageNumber) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.totalPage = totalPage;
        this.readPageNumber = readPageNumber;
    }

    public void changeStatus(Status status) {
        this.status = status;
    }

    public void updatePagesPerDay(int pagesPerDay) {
        this.pagesPerDay = pagesPerDay;
        updateTodayReadPage(this.readPageNumber + this.pagesPerDay);
    }

    private void updateTodayReadPage(int todayReadPage) {
        this.todayPage = todayReadPage > this.totalPage ? this.totalPage: todayReadPage;
    }
}
