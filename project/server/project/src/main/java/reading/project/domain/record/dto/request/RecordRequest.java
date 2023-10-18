package reading.project.domain.record.dto.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import reading.project.domain.record.entity.Record;

import java.time.LocalDate;

import static reading.project.domain.record.entity.Record.Status;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RecordRequest {
    private LocalDate startDate;
    private LocalDate endDate;
    private int readPageNumber;
    private Status status;

    public Record toEntity(Member member, Book book) {
        return Record.builder()
                .startDate(startDate)
                .endDate(endDate)
                .readPageNumber(readPageNumber)
                .status(status)
                .member(member)
                .book(book)
                .build();
    }
}
