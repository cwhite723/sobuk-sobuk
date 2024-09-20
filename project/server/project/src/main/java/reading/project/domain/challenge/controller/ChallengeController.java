package reading.project.domain.challenge.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import reading.project.domain.auth.interceptor.JwtParseInterceptor;
import reading.project.domain.challenge.dto.request.ChallengeRequest;
import reading.project.domain.challenge.dto.response.ChallengeDetailResponse;
import reading.project.domain.challenge.dto.response.ChallengeResponseForMain;
import reading.project.domain.challenge.dto.response.GetChallengeResponse;
import reading.project.domain.challenge.service.ChallengeService;
import reading.project.domain.challenge.dto.response.ChallengeMemberInfo;
import reading.project.domain.member.service.MemberService;
import reading.project.domain.readingplan.dto.request.ReadingPlanRequest;
import reading.project.domain.readingplan.service.ReadingPlanService;
import reading.project.global.page.CommonPageRequest;
import reading.project.global.response.ApplicationResponse;

import java.util.List;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/challenges")
public class ChallengeController {
    private final ChallengeService challengeService;
    private final MemberService memberService;
    private final ReadingPlanService readingPlanService;

    @PostMapping("/{book-id}")
    @ResponseStatus(CREATED)
    public ApplicationResponse<Long> createChallenge(@PathVariable("book-id") Long bookId, @Valid @RequestBody ChallengeRequest request) {
        Long loginId = JwtParseInterceptor.getAuthenticatedUserId();
        Long challengeId = challengeService.createChallenge(bookId, loginId, request);

        return ApplicationResponse.ok(challengeId);
    }

    @PatchMapping("/{challenge-id}")
    @ResponseStatus(OK)
    public ApplicationResponse<Long> updateChallenge(@PathVariable("challenge-id") Long challengeId, @Valid @RequestBody ChallengeRequest request) {
        Long loginId = JwtParseInterceptor.getAuthenticatedUserId();
        challengeService.updateChallenge(challengeId, loginId, request);

        return ApplicationResponse.ok(challengeId);
    }

    @DeleteMapping("/{challenge-id}")
    @ResponseStatus(OK)
    public ApplicationResponse<Void> deleteChallenge(@PathVariable("challenge-id") Long challengeId) {
        Long loginId = JwtParseInterceptor.getAuthenticatedUserId();
        challengeService.deleteChallenge(challengeId, loginId);

        return ApplicationResponse.noData();
    }

    @GetMapping("/{challenge-id}")
    @ResponseStatus(OK)
    public ApplicationResponse<GetChallengeResponse> getChallenge(@PathVariable("challenge-id") Long challengeId) {
        Long loginId = JwtParseInterceptor.getAuthenticatedUserId();
        ChallengeDetailResponse challengeDetail = challengeService.getChallenge(challengeId, loginId);
        List<ChallengeMemberInfo> challengeMemberList = challengeService.getParticipants(challengeId);

        return ApplicationResponse.ok(new GetChallengeResponse(challengeDetail, challengeMemberList));
    }

    @GetMapping
    @ResponseStatus(OK)
    public ApplicationResponse<Page<ChallengeResponseForMain>> getAllChallenges(CommonPageRequest pageRequest) {
        Long loginId = JwtParseInterceptor.getAuthenticatedUserId();
        Page<ChallengeResponseForMain> challenges = challengeService.getAllChallenges(loginId, pageRequest.of());

        return ApplicationResponse.ok(challenges);
    }

    @PostMapping("/{challenge-id}/participate")
    @ResponseStatus(CREATED)
    public ApplicationResponse<Long> participateChallenge(@PathVariable("challenge-id") Long challengeId) {
        Long loginId = JwtParseInterceptor.getAuthenticatedUserId();
        challengeService.participateChallenge(loginId, challengeId);

        return ApplicationResponse.ok(challengeId);
    }

    @GetMapping("/my-challenge")
    @ResponseStatus(OK)
    public ApplicationResponse<Page<ChallengeResponseForMain>> getMyChallenges(CommonPageRequest pageRequest) {
        Long loginId = JwtParseInterceptor.getAuthenticatedUserId();
        Page<ChallengeResponseForMain> challenges = challengeService.getMyChallenges(loginId, pageRequest.of());

        return ApplicationResponse.ok(challenges);
    }
}
