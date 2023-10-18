package reading.project.domain.record.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import reading.project.global.base.BaseEntity;

import java.time.LocalDate;

import static jakarta.persistence.FetchType.LAZY;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "records")
@Entity
public class Record extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "record_id", nullable = false)
    private Long id;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

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
        PENDING("pending");

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
    public Record(LocalDate startDate, LocalDate endDate, int readPageNumber, Status status, Book book, Member member) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.readPageNumber = readPageNumber;
        this.status = status;
        this.book = book;
        this.member = member;
    }

    public void update(LocalDate startDate, LocalDate endDate, int readPageNumber, Status status) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.readPageNumber = readPageNumber;
        this.status = status;
    }
}
