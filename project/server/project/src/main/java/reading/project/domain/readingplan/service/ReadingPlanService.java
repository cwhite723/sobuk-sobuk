package reading.project.domain.readingplan.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reading.project.domain.book.entity.Book;
import reading.project.domain.book.service.BookService;
import reading.project.domain.readingplan.dto.request.ReadingPlanRequest;
import reading.project.domain.readingplan.dto.response.ReadingPlanResponse;
import reading.project.domain.readingplan.entity.ReadingPlan;
import reading.project.domain.readingplan.entity.ReadingPlan.Status;
import reading.project.domain.readingplan.repository.ReadingPlanRepository;
import reading.project.global.exception.CustomException;
import reading.project.domain.member.entity.Member;
import reading.project.domain.member.service.MemberService;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static reading.project.domain.readingplan.entity.ReadingPlan.Status.*;
import static reading.project.global.exception.ErrorCode.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReadingPlanService {
    private final ReadingPlanRepository readingPlanRepository;
    private final MemberService memberService;
    private final BookService bookService;

    @Transactional
    public void registerPlan(Long loginId, Long bookId, ReadingPlanRequest request) {
        Member member = memberService.findExistsMember(loginId);
        Book book = bookService.findBookById(bookId);

        ReadingPlan readingPlan = request.toEntity(member, book);
        readingPlanRepository.save(readingPlan);
        changeStatus(readingPlan);
        updateReadPage(readingPlan);
    }

    @Transactional
    public void updatePlan(Long loginId, Long planId, ReadingPlanRequest request) {
        ReadingPlan readingPlan = findReadingPlanById(planId);
        validateCreator(loginId, readingPlan.getMember().getId());

        readingPlan.update(request.getStartDate(), request.getEndDate(), request.getTotalPage(), request.getReadPageNumber(), request.getChallengeId());
        changeStatus(readingPlan);
    }

    @Transactional
    public void deletePlan(Long loginId, Long planId) {
        ReadingPlan readingPlan = findReadingPlanById(planId);
        validateCreator(loginId, readingPlan.getMember().getId());

        readingPlanRepository.delete(readingPlan);
    }

    public List<ReadingPlanResponse> getReadingPlans(Long loginId, List<Status> statuses) {

        return readingPlanRepository.getReadingPlans(loginId, statuses);
    }

    private void validateCreator(Long loginId, Long creatorId) {
        if (!loginId.equals(creatorId)) {
            throw new CustomException(NOT_CREATOR);
        }
    }

    public ReadingPlan findReadingPlanById(Long planId) {

        return readingPlanRepository.findById(planId)
                .orElseThrow(() -> new CustomException(NOT_FOUND_READING_PLAN));
    }

    @Transactional
    public void calculatePagesPerDay() {
        List<ReadingPlan> plans = readingPlanRepository.findByStatus(READING);

        for (ReadingPlan plan : plans) {
            updateReadPage(plan);
        }
    }

    @Transactional
    private static void updateReadPage(ReadingPlan plan) {
        LocalDateTime start = LocalDateTime.now();
        LocalDateTime end = plan.getEndDate().atStartOfDay();
        int betweenDays = (int) Duration.between(start, end).toDays() + 1;

        int remainPage = plan.getTotalPage() - plan.getReadPageNumber();
        plan.updatePagesPerDay(remainPage / betweenDays);
    }

    @Transactional
    private void changeStatus(ReadingPlan plan) {
        if (plan.getStartDate().isAfter(LocalDate.now())) {
            plan.changeStatus(NOT_STARTED);
        } else if (plan.getReadPageNumber() >= plan.getTotalPage()) {
            plan.changeStatus(NOT_CREATED_POST);
        } else if (plan.getEndDate().isBefore(LocalDate.now())) {
            plan.changeStatus(OVERDUE);
        } else {
            plan.changeStatus(READING);
        }
    }
    @Transactional
    public void changeStatus() {
        List<ReadingPlan> readingPlans = readingPlanRepository.findByStatus(READING);
        List<ReadingPlan> notStartedPlans = readingPlanRepository.findByStatus(NOT_STARTED);

        for (ReadingPlan plan : readingPlans) {
            if (plan.getEndDate().isBefore(LocalDate.now())) {
                plan.changeStatus(OVERDUE);
            }
        }

        for (ReadingPlan plan : notStartedPlans) {
            if (plan.getStartDate().isEqual(LocalDate.now())) {
                plan.changeStatus(READING);
            }
        }
    }

    public void checkFinishReading(ReadingPlan plan) {
        if (plan.getStatus().equals(COMPLETED)) {
            throw new CustomException(POST_EXISTS);
        } else if (!plan.getStatus().equals(NOT_CREATED_POST)) {
            throw new CustomException(NOT_FINISH_READING);
        }
    }
}
