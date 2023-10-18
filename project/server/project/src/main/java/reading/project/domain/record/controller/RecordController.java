package reading.project.domain.record.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import reading.project.domain.record.dto.request.RecordRequest;
import reading.project.domain.record.service.RecordService;
import reading.project.global.response.ApplicationResponse;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/records")
public class RecordController {
    private final RecordService recordService;

    @PostMapping("/{book-id")
    @ResponseStatus(CREATED)
    public ApplicationResponse<Void> registerRecord(@PathVariable("book-id") Long bookId, @RequestBody RecordRequest request) {
        //TODO: memberId 토큰 받아와서 사용하도록 수정
        Long loginId = 1L;
        recordService.registerRecord(loginId, bookId, request);

        return ApplicationResponse.noData();
    }

    @PatchMapping("/{record-id}")
    @ResponseStatus(OK)
    public ApplicationResponse<Void> updateRecord(@PathVariable("record-id") Long recordId, @RequestBody RecordRequest request) {
        //TODO: memberId 토큰 받아와서 사용하도록 수정
        Long loginId = 1L;
        recordService.updateRecord(loginId, recordId, request);

        return ApplicationResponse.noData();
    }

    @DeleteMapping("/{record-id")
    @ResponseStatus(OK)
    public ApplicationResponse<Void> deleteRecord(@PathVariable("record-id") Long recordId) {
        //TODO: memberId 토큰 받아와서 사용하도록 수정
        Long loginId = 1L;
        recordService.deleteRecord(loginId, recordId);

        return ApplicationResponse.noData();
    }
}
