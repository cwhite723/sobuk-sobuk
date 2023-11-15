package reading.project.domain.member.controller;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.http.HeaderUtil;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;
import reading.project.domain.member.dto.SearchFollow;
import reading.project.domain.member.dto.SliceResponse;
import reading.project.domain.member.dto.UserPageDetails;
import reading.project.domain.member.service.MemberService;
import reading.project.domain.member.dto.MemberDto;
import reading.project.global.response.ApplicationResponse;

import static org.springframework.http.HttpStatus.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/members")
public class MemberController {
    private final MemberService memberService;

    @PostMapping("/log-out")
    @ResponseStatus(OK)
    public ApplicationResponse<Void> logOutMember(HttpServletRequest request) {
        memberService.logout(request);
        return ApplicationResponse.noData();
    }

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
    public ApplicationResponse getMemberInfo(@PathVariable("member-id") long memberId) {
        UserPageDetails response = this.memberService.userPage(memberId);
        return ApplicationResponse.ok(response);
    }

    @DeleteMapping("/{member-id}")
    @ResponseStatus(NO_CONTENT)
    public ApplicationResponse<Void> deleteMember(@PathVariable("member-id") long memberId) {
        this.memberService.deleteMember(memberId);
        return ApplicationResponse.noData();
    }

    @GetMapping("/my-page")
    @ResponseStatus(OK)
    public ApplicationResponse myPageMember() {
        return ApplicationResponse.ok(memberService.myPageInfo());
    }

    @PatchMapping("/{member-id}/follow")
    @ResponseStatus(OK)
    public ApplicationResponse memberFollow(@PathVariable("member-id") long followId) {
        memberService.followMember(followId);
        return ApplicationResponse.noData();
    }

    @GetMapping("/my-page/followings")
    @ResponseStatus(OK)
    public ApplicationResponse<SliceResponse<SearchFollow>> followingMembers(@RequestParam(value = "id", required = false) Long cursorId,
                                                                             @PageableDefault(size = 2) Pageable pageable){

        SliceResponse<SearchFollow> response = memberService.followingList(cursorId, pageable);
        return ApplicationResponse.ok(response);
    }

    @GetMapping("/my-page/followers")
    @ResponseStatus(OK)
    public ApplicationResponse<SliceResponse<SearchFollow>> followerMembers(@RequestParam(value = "id", required = false) Long cursorId,
                                                                            @PageableDefault(size = 2) Pageable pageable){

        SliceResponse<SearchFollow> response = memberService.followerList(cursorId, pageable);
        return ApplicationResponse.ok(response);
    }

    // 아이디 중복 api
    @GetMapping("/id-check")
    @ResponseStatus(OK)
    public ApplicationResponse<Void> checkUserName(@RequestBody @Valid MemberDto.PostUN requestBody) {
        memberService.verifyExistUserName(requestBody);
        return ApplicationResponse.noData();
    }

    // 닉네임 중복 api
    @GetMapping("/nickname-check")
    public ApplicationResponse<Void> checkNickname(@RequestBody @Valid MemberDto.PostNN requestBody) {
        memberService.verifyExistsNickname(requestBody);
        return ApplicationResponse.noData();
    }

}
