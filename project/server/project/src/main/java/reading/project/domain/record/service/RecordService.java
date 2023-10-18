package reading.project.domain.record.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reading.project.domain.record.dto.request.RecordRequest;
import reading.project.domain.record.entity.Record;
import reading.project.domain.record.repository.RecordRepository;
import reading.project.global.exception.CustomException;
import reading.project.global.exception.ErrorCode;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RecordService {
    private final RecordRepository recordRepository;
    private final MemberService memberService;
    private final BookService bookService;

    @Transactional
    public void registerRecord(Long loginId, Long bookId, RecordRequest request) {
        Member member = memberService.findMemberById(loginId);
        Book book = bookService.findBookById(bookId);

        Record record = request.toEntity(member, book);
        recordRepository.save(record);
    }

    @Transactional
    public void updateRecord(Long loginId, Long recordId, RecordRequest request) {
        Record record = findRecordById(recordId);
        validateAuthor(loginId, record.getMember().getId());

        record.update(request.getStartDate(), request.getEndDate(), request.getReadPageNumber(), request.getStatus());
    }

    @Transactional
    public void deleteRecord(Long loginId, Long recordId) {
        Record record = findRecordById(recordId);
        validateAuthor(loginId, record.getMember().getId());

        recordRepository.delete(record);
    }

    private void validateAuthor(Long loginId, Long authorId) {
        if (!loginId.equals(authorId)) {
            throw new CustomException(ErrorCode.NOT_AUTHOR);
        }
    }

    public Record findRecordById(Long recordId) {

        return recordRepository.findById(recordId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_RECORD));
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
