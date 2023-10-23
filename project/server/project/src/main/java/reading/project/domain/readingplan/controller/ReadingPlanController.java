package reading.project.domain.readingplan.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import reading.project.domain.readingplan.dto.request.ReadingPlanRequest;
import reading.project.domain.readingplan.service.ReadingPlanService;
import reading.project.global.response.ApplicationResponse;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/records")
public class ReadingPlanController {
    private final ReadingPlanService readingPlanService;

    @PostMapping("/{book-id}")
    @ResponseStatus(CREATED)
    public ApplicationResponse<Void> registerPlan(@PathVariable("book-id") Long bookId, @RequestBody ReadingPlanRequest request) {
        //TODO: memberId 토큰 받아와서 사용하도록 수정
        Long loginId = 1L;
        readingPlanService.registerPlan(loginId, bookId, request);

        return ApplicationResponse.noData();
    }

    @PatchMapping("/{plan-id}")
    @ResponseStatus(OK)
    public ApplicationResponse<Void> updatePlan(@PathVariable("plan-id") Long planId, @RequestBody ReadingPlanRequest request) {
        //TODO: memberId 토큰 받아와서 사용하도록 수정
        Long loginId = 1L;
        readingPlanService.updatePlan(loginId, planId, request);

        return ApplicationResponse.noData();
    }

    @DeleteMapping("/{plan-id}")
    @ResponseStatus(OK)
    public ApplicationResponse<Void> deletePlan(@PathVariable("plan-id") Long planId) {
        //TODO: memberId 토큰 받아와서 사용하도록 수정
        Long loginId = 1L;
        readingPlanService.deletePlan(loginId, planId);

        return ApplicationResponse.noData();
    }
}
