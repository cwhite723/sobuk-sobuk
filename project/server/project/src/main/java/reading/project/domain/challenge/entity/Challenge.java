package reading.project.domain.challenge.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import reading.project.domain.book.entity.Book;
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
@Table(name = "challenges")
@Entity
public class Challenge extends BaseEntity {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "challenge_id", nullable = false, updatable = false)
    private Long id;

    @Column(name = "content", columnDefinition = "text")
    private String content;

    @Column(name = "recruit_count")
    private int recruitCount;

    @Column(name = "recruit_start_date", updatable = false)
    private LocalDate recruitStartDate;

    @Column(name = "recruit_end_date")
    private LocalDate recruitEndDate;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(name = "success_rate")
    private Double successRate;

    @Column(name = "host_id")
    private Long hostId;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "book_id", nullable = false)
    @OnDelete(action = CASCADE)
    private Book book;

    @OnDelete(action = CASCADE)
    @OneToMany(mappedBy = "challenge", cascade = PERSIST)
    private List<ChallengeMember> challengeMembers = new ArrayList<>();

    @Builder
    public Challenge(String content, int recruitCount, LocalDate startDate, LocalDate endDate, LocalDate recruitStartDate, LocalDate recruitEndDate, Long hostId, Book book) {
        this.content = content;
        this.recruitCount = recruitCount;
        this.startDate = startDate;
        this.endDate = endDate;
        this.recruitStartDate = recruitStartDate;
        this.recruitEndDate = recruitEndDate;
        this.hostId = hostId;
        this.book = book;
    }

    public void update(String content, int recruitCount, LocalDate startDate, LocalDate endDate) {
        this.content = content;
        this.recruitCount = recruitCount;
        this.startDate = startDate;
        this.endDate = endDate;
        this.recruitEndDate = endDate.minusDays(1);
    }
}
