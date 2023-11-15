package reading.project.domain.readingplan.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import reading.project.domain.auth.interceptor.JwtParseInterceptor;
import reading.project.domain.readingplan.dto.request.ReadingPlanRequest;
import reading.project.domain.readingplan.dto.response.ReadingPlanResponse;
import reading.project.domain.readingplan.entity.ReadingPlan;
import reading.project.domain.readingplan.service.ReadingPlanService;
import reading.project.global.response.ApplicationResponse;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;
import static reading.project.domain.readingplan.entity.ReadingPlan.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/plans")
public class ReadingPlanController {
    private final ReadingPlanService readingPlanService;

    @PostMapping("/{book-id}")
    @ResponseStatus(CREATED)
    public ApplicationResponse<Void> registerPlan(@PathVariable("book-id") Long bookId, @Valid @RequestBody ReadingPlanRequest request) {
        Long loginId = JwtParseInterceptor.getAuthenticatedUserId();
        readingPlanService.registerPlan(loginId, bookId, request);

        return ApplicationResponse.noData();
    }

    @PatchMapping("/{plan-id}")
    @ResponseStatus(OK)
    public ApplicationResponse<Void> updatePlan(@PathVariable("plan-id") Long planId, @Valid @RequestBody ReadingPlanRequest request) {
        Long loginId = JwtParseInterceptor.getAuthenticatedUserId();
        readingPlanService.updatePlan(loginId, planId, request);

        return ApplicationResponse.noData();
    }

    @DeleteMapping("/{plan-id}")
    @ResponseStatus(OK)
    public ApplicationResponse<Void> deletePlan(@PathVariable("plan-id") Long planId) {
        Long loginId = JwtParseInterceptor.getAuthenticatedUserId();
        readingPlanService.deletePlan(loginId, planId);

        return ApplicationResponse.noData();
    }

    @GetMapping
    @ResponseStatus(OK)
    public ApplicationResponse<List<ReadingPlanResponse>> getReadingPlans(@RequestParam(value = "status") List<Status> statuses) {
        Long loginId = JwtParseInterceptor.getAuthenticatedUserId();
        List<ReadingPlanResponse> responses = readingPlanService.getReadingPlans(loginId, statuses);

        return ApplicationResponse.ok(responses);
    }
}
