package reading.project.domain.challenge.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import reading.project.domain.auth.interceptor.JwtParseInterceptor;
import reading.project.domain.challenge.dto.request.ChallengeRequest;
import reading.project.domain.challenge.service.ChallengeService;
import reading.project.global.response.ApplicationResponse;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/challenges")
public class ChallengeController {
    private final ChallengeService challengeService;

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
}
