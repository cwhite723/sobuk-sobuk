package reading.project.domain.member.controller;


import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import reading.project.domain.member.service.MemberService;
import reading.project.domain.member.dto.MemberDto;
import reading.project.global.response.ApplicationResponse;

import static org.springframework.http.HttpStatus.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/members")
public class MemberController {
    private final MemberService memberService;

    @PostMapping("/sign-up")
    @ResponseStatus(CREATED)
    public ApplicationResponse<Void> postMember(@Valid @RequestBody MemberDto.Post requestBody) {
        this.memberService.createMember(requestBody);
        return ApplicationResponse.noData();
    }

    @PatchMapping("/{member-id}")
    @ResponseStatus(OK)
    public ApplicationResponse<MemberDto.Response> patchMember(
            @PathVariable("member-id") long memberId,
            @RequestBody MemberDto.Patch requestBody
    ) {
        return ApplicationResponse.ok(this.memberService.updateMember(memberId, requestBody));
    }

    @GetMapping("/{member-id}")
    @ResponseStatus(OK)
    public ApplicationResponse<MemberDto.Response> getMember(@PathVariable("member-id") long memberId) {
        MemberDto.Response response = this.memberService.findMember(memberId);
        return ApplicationResponse.ok(response);
    }

    @DeleteMapping("/{member-id}")
    @ResponseStatus(NO_CONTENT)
    public ApplicationResponse<Void> deleteMember(@PathVariable("member-id") long memberId) {
        this.memberService.deleteMember(memberId);
        return ApplicationResponse.noData();
    }
}
