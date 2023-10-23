package reading.project.domain.readingplan.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reading.project.domain.book.entity.Book;
import reading.project.domain.book.service.BookService;
import reading.project.domain.readingplan.dto.request.ReadingPlanRequest;
import reading.project.domain.readingplan.entity.ReadingPlan;
import reading.project.domain.readingplan.repository.ReadingPlanRepository;
import reading.project.global.exception.CustomException;
import reading.project.global.member.entity.Member;
import reading.project.global.member.service.MemberService;

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
    }

    @Transactional
    public void updatePlan(Long loginId, Long planId, ReadingPlanRequest request) {
        ReadingPlan readingPlan = findReadingPlanById(planId);
        validateCreator(loginId, readingPlan.getMember().getId());

        readingPlan.update(request.getStartDate(), request.getEndDate(), request.getReadPageNumber(), request.getStatus());
    }

    @Transactional
    public void deletePlan(Long loginId, Long planId) {
        ReadingPlan readingPlan = findReadingPlanById(planId);
        validateCreator(loginId, readingPlan.getMember().getId());

        readingPlanRepository.delete(readingPlan);
    }

    private void validateCreator(Long loginId, Long creatorId) {
        if (!loginId.equals(creatorId)) {
            throw new CustomException(NOT_CREATOR);
        }
    }

    public ReadingPlan findReadingPlanById(Long planId) {

        return readingPlanRepository.findById(planId)
                .orElseThrow(() -> new CustomException(NOT_FOUND_CREATOR));
    }

    //TODO: Book, Member Entity 완성 후 수정 및 스케줄러 적용하기
//    private int calculatePagesPerDay(Record record) {
//        if (record.pageNumber == readPageNumber) {
//            return 0;
//        }
//
//        LocalDateTime start = startDate.atStartOfDay();
//        LocalDateTime end = endDate.atStartOfDay();
//        int betweenDays = (int) Duration.between(start, end).toDays();
//        int remainingPages = pageNumber - readPageNumber;
//
//        return remainingPages / betweenDays;
//    }
}
