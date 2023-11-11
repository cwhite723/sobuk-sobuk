package reading.project.domain.member.service;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reading.project.domain.member.repository.MemberRepository;
import reading.project.domain.auth.interceptor.JwtParseInterceptor;
import reading.project.domain.auth.user.MemberCustomAuthorityUtils;
import reading.project.global.config.redis.util.RedisDao;
import reading.project.global.exception.CustomException;
import reading.project.global.exception.ErrorCode;
import reading.project.domain.member.dto.MemberDto;
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

    public void createMember(MemberDto.Post requestBody) {
        verifyExistUserName(requestBody.getUserName());
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

    public void logout(String atk) {
        String loginUserName = findExistsMember(jwtParseInterceptor.getAuthenticatedUserId()).getUserName();
        redisDao.deleteValues(loginUserName);
        if(atk != null) redisDao.setValueBlackList(atk,"access_token",30L);
    }

    // 로그인 유저 확인
    public void validateUser(Long memberId) {
        if(jwtParseInterceptor.getAuthenticatedUserId() != memberId) throw new CustomException(ErrorCode.MEMBER_NOT_AUTHORIZED);
    }

    public MemberDto.Response myPageInfo() {
        return this.mapper.memberToMemberDtoResponse(this.findExistsMember(jwtParseInterceptor.getAuthenticatedUserId()));
    }
}
