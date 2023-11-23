package reading.project.domain.member.service;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reading.project.domain.auth.utils.HeaderUtil;
import reading.project.domain.member.dto.*;
import reading.project.domain.member.entity.Follow;
import reading.project.domain.member.repository.FollowRepository;
import reading.project.domain.member.repository.MemberRepository;
import reading.project.domain.auth.interceptor.JwtParseInterceptor;
import reading.project.domain.auth.user.MemberCustomAuthorityUtils;
import reading.project.global.config.redis.util.RedisDao;
import reading.project.global.exception.CustomException;
import reading.project.global.exception.ErrorCode;
import reading.project.domain.member.entity.Member;
import reading.project.domain.member.mapper.MemberMapper;

import java.util.List;

@RequiredArgsConstructor
@Transactional
@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final MemberMapper mapper;
    private final MemberCustomAuthorityUtils authorityUtils;
    private final PasswordEncoder passwordEncoder;
    private final JwtParseInterceptor jwtParseInterceptor;
    private final RedisDao redisDao;

    private final FollowRepository followRepository;

    public void createMember(MemberDto.Post requestBody) {
        verifyExistUserName(requestBody.getUserName());
        verifyExistsNickname(requestBody.getNickname());
        Member member =mapper.memberDtoPostToMember(requestBody);
        member.changePassword(passwordEncoder.encode(member.getPassword()));
        //역할 부여 필요
        List<String> roles = authorityUtils.createRoles(member.getUserName());
        member.setRoles(roles);

        this.memberRepository.save(member);
    }

    public MemberDto.Response updateMember(long memberId, MemberDto.Patch requestBody) {
        validateUser(memberId);
        return this.mapper.memberToMemberDtoResponse(this.findExistsMember(memberId).update(requestBody));
    }

    public MemberDto.Response findMember(long memberId) {
        return this.mapper.memberToMemberDtoResponse(this.findExistsMember(memberId));
    }

    public void deleteMember(long memberId) {
        validateUser(memberId);
        this.memberRepository.delete(this.findExistsMember(memberId));
    }

    public Member findExistsMember(long memberId) {
        return this.memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));
    }

    public void verifyExistUserName(String userName){
        if(memberRepository.findByUserName(userName).isPresent()){
                throw new CustomException(ErrorCode.MEMBER_EXISTS);
        }
    }

    public void verifyExistUserName(MemberDto.PostUN requestBody) {
        verifyExistUserName(requestBody.getUserName());
    }

    public void logout(HttpServletRequest request) {
        String loginUserName = findExistsMember(jwtParseInterceptor.getAuthenticatedUserId()).getUserName();
        String atk = HeaderUtil.getAccessToken(request);
        redisDao.deleteValues(loginUserName);
        if(atk != null) redisDao.setValueBlackList(atk,"access_token",30L);
    }

    // 로그인 유저 확인
    public void validateUser(Long memberId) {
        if(jwtParseInterceptor.getAuthenticatedUserId() != memberId) throw new CustomException(ErrorCode.MEMBER_NOT_AUTHORIZED);
    }

    public MyPageDetails myPageInfo() {
        Long userId = jwtParseInterceptor.getAuthenticatedUserId();
        Member member = this.findExistsMember(userId);
        Long follower = memberRepository.countByFollowings(userId);
        Long following = memberRepository.countByFollowers(userId);
        Long countPost = memberRepository.countByPostList(userId);
        Long countReadingPlan = memberRepository.countByReadingPlanList(userId);
        MyPageDetails memberInfo = MyPageDetails.builder()
                .userName(member.getUserName())
                .nickname(member.getNickname())
                .introduction(member.getIntroduction())
                .image(member.getImage())
                .countFollower(follower)
                .countFollowing(following)
                .countPost(countPost)
                .countBookMark(countReadingPlan)
                .build();
        return memberInfo;
    }

    public void followMember(long followId) {
        Long userId = jwtParseInterceptor.getAuthenticatedUserId();
        if(followId == userId) throw new CustomException(ErrorCode.REQUEST_VALIDATION_FAIL);
        Member findFollowingMember = findExistsMember(followId);
        Member user = findExistsMember(userId);
        List<Follow> follows = checkFollowing(userId, findFollowingMember);
        if(follows.isEmpty()) {
            this.followRepository.save(Follow.builder()
                    .followingId(findFollowingMember)
                    .followerId(user)
                    .build());
        } else {
            this.followRepository.delete(follows.get(0));
        }
    }

    private List<Follow> checkFollowing(Long id, Member followingMember) {

        return this.memberRepository.findByFollowing(id, followingMember);
    }

    public SliceResponse<SearchFollow> followingList(Long cursorId, Pageable pageable) {
        Long userId = this.jwtParseInterceptor.getAuthenticatedUserId();

        Slice<SearchFollow> following = this.memberRepository.findByFollowingList(userId, cursorId,pageable);
        List<SearchFollow> followings = following.getContent();
        boolean hasNext = following.hasNext();
        int size = pageable.getPageSize();

        return new SliceResponse<>(followings,hasNext,size);
    }

    public SliceResponse<SearchFollow> followerList(Long cursorId, Pageable pageable) {
        Long userId = jwtParseInterceptor.getAuthenticatedUserId();

        Slice<SearchFollow> follower = this.memberRepository.findByFollowerList(userId, cursorId, pageable);
        List<SearchFollow> followers = follower.getContent();
        boolean hasNext = follower.hasNext();
        int size = pageable.getPageSize();

        return new SliceResponse<>(followers, hasNext,size);

    }

    public void verifyExistsNickname (String nickname) {
        if(memberRepository.findByNickname(nickname).isPresent()){
            throw new CustomException(ErrorCode.MEMBER_NICKNAME_EXISTS);
        }
    }

    public void verifyExistsNickname (MemberDto.PostNN request) {
        verifyExistsNickname(request.getNickname());
    }

    public UserPageDetails userPage(long memberId) {
        Long userId = jwtParseInterceptor.getAuthenticatedUserId();
        if(userId == memberId) throw new CustomException(ErrorCode.REQUEST_VALIDATION_FAIL);
        Member member = findExistsMember(memberId);

        boolean isFollowing = checkFollowing(userId, member).size() > 0;
        long countBookMark = memberRepository.countByReadingPlanList(memberId);
        long countPost = memberRepository.countByPostList(memberId);
        UserPageDetails userInfo = UserPageDetails.builder()
                .userName(member.getUserName())
                .nickname(member.getNickname())
                .introduction(member.getIntroduction())
                .isFollowing(isFollowing)
                .countBookMark(countBookMark)
                .countPost(countPost)
                .build();

        return userInfo;
    }

    public SliceResponse<InfoPagePostList> postList(Long memberId, Long cursorId, Pageable pageable) {
        findExistsMember(memberId);
        Slice<InfoPagePostList> postLists = memberRepository.findByPostList(memberId, cursorId, pageable);
        List<InfoPagePostList> lists = postLists.getContent();
        boolean hashNext = postLists.hasNext();
        int size = pageable.getPageSize();

        return new SliceResponse<>(lists, hashNext, size);
    }

    public SliceResponse<InfoPagePostList> postList(Long cursorId, Pageable pageable) {
        Long userId = jwtParseInterceptor.getAuthenticatedUserId();
        findExistsMember(userId);
        Slice<InfoPagePostList> postLists = memberRepository.findByPostList(userId, cursorId, pageable);
        List<InfoPagePostList> lists = postLists.getContent();
        boolean hashNext = postLists.hasNext();
        int size = pageable.getPageSize();

        return new SliceResponse<>(lists, hashNext, size);
    }

    public SliceResponse<InfoPageBookmarkList> bookmarkList(Long memberId, Long cursorId, Pageable pageable) {
        findExistsMember(memberId);
        Slice<InfoPageBookmarkList> bookmarkLists = memberRepository.findByReadingPlanList(memberId, cursorId, pageable);
        List<InfoPageBookmarkList> lists = bookmarkLists.getContent();
        boolean hashNext = bookmarkLists.hasNext();
        int size = pageable.getPageSize();

        return new SliceResponse<>(lists, hashNext, size);
    }
    public SliceResponse<InfoPageBookmarkList> bookmarkList(Long cursorId, Pageable pageable) {
        Long userId = jwtParseInterceptor.getAuthenticatedUserId();
        findExistsMember(userId);
        Slice<InfoPageBookmarkList> bookmarkLists = memberRepository.findByReadingPlanList(userId, cursorId, pageable);
        List<InfoPageBookmarkList> lists = bookmarkLists.getContent();
        boolean hashNext = bookmarkLists.hasNext();
        int size = pageable.getPageSize();

        return new SliceResponse<>(lists, hashNext, size);
    }
}
