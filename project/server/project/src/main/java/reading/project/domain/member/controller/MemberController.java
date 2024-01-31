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
import reading.project.domain.member.dto.*;
import reading.project.domain.member.service.MemberService;
import reading.project.global.response.ApplicationResponse;

import static org.springframework.http.HttpStatus.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/members")
public class MemberController {
    private final MemberService memberService;

    @PatchMapping("/refresh")
    public ApplicationResponse<Void> renewAceessToken(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = request.getHeader("refresh");
        String accessToken = memberService.reissue(refreshToken);
        response.setHeader("Authorization","Bearer" + accessToken);
        return ApplicationResponse.noData();
    }

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

    @PatchMapping
    @ResponseStatus(OK)
    public ApplicationResponse<MemberDto.Response> patchMember(
            @RequestBody MemberDto.Patch requestBody
    ) {
        return ApplicationResponse.ok(this.memberService.updateMember(requestBody));
    }
    // 유저 정보 상세 페이지 api
    @GetMapping("/{member-id}")
    @ResponseStatus(OK)
    public ApplicationResponse getMemberInfo(@PathVariable("member-id") long memberId) {
        UserPageDetails response = this.memberService.userPage(memberId);
        return ApplicationResponse.ok(response);
    }

    @DeleteMapping
    @ResponseStatus(NO_CONTENT)
    public ApplicationResponse<Void> deleteMember() {
        this.memberService.deleteMember();
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
    @PostMapping("/id-check")
    @ResponseStatus(OK)
    public ApplicationResponse<Void> checkUserName(@RequestBody @Valid MemberDto.PostUN requestBody) {
        memberService.verifyExistUserName(requestBody);
        return ApplicationResponse.noData();
    }

    // 닉네임 중복 api
    @PostMapping("/nickname-check")
    @ResponseStatus(OK)
    public ApplicationResponse<Void> checkNickname(@RequestBody @Valid MemberDto.PostNN requestBody) {
        memberService.verifyExistsNickname(requestBody);
        return ApplicationResponse.noData();
    }

    // member 독서기록 api
    @GetMapping("/{member-id}/postInfo")
    @ResponseStatus(OK)
    public ApplicationResponse<SliceResponse<InfoPagePostList>> postInfo(@PathVariable(value = "member-id") Long memberId,
                                                                         @RequestParam(value ="id", required = false) Long cursorId,
                                                                         @PageableDefault(size = 3) Pageable pageable) {
        SliceResponse<InfoPagePostList> response = memberService.postList(memberId,cursorId,pageable);
        return ApplicationResponse.ok(response);
    }

    // member 서재기록 api
    @GetMapping("/{member-id}/bookmarkInfo")
    @ResponseStatus(OK)
    public ApplicationResponse<SliceResponse<InfoPageBookmarkList>> bookmarkInfo(@PathVariable(value = "member-id") Long memberId,
                                                                                 @RequestParam(value ="id", required = false) Long cursorId,
                                                                                 @PageableDefault(size = 3) Pageable pageable) {
        SliceResponse<InfoPageBookmarkList> response = memberService.bookmarkList(memberId,cursorId,pageable);
        return ApplicationResponse.ok(response);
    }

    // mypage 독서기록 api
    @GetMapping("/my-page/postInfo")
    @ResponseStatus(OK)
    public ApplicationResponse<SliceResponse<InfoPagePostList>> postInfo(@RequestParam(value ="id", required = false) Long cursorId,
                                                                         @PageableDefault(size = 3) Pageable pageable) {
        SliceResponse<InfoPagePostList> response = memberService.postList(cursorId,pageable);
        return ApplicationResponse.ok(response);
    }

    // mypage 서재기록 api
    @GetMapping("/my-page/bookmarkInfo")
    @ResponseStatus(OK)
    public ApplicationResponse<SliceResponse<InfoPageBookmarkList>> bookmarkInfo(@RequestParam(value ="id", required = false) Long cursorId,
                                                                                 @PageableDefault(size = 3) Pageable pageable) {
        SliceResponse<InfoPageBookmarkList> response = memberService.bookmarkList(cursorId,pageable);
        return ApplicationResponse.ok(response);
    }

    // https 대상 그룹 200 상태 검사를 위한 api
    @GetMapping("/healthy")
    @ResponseStatus(OK)
    public ApplicationResponse statusCode () {

        return ApplicationResponse.ok("healthy");
    }
}
