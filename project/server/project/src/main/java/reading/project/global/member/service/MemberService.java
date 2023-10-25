package reading.project.global.member.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reading.project.global.exception.CustomException;
import reading.project.global.exception.ErrorCode;
import reading.project.global.member.dto.MemberDto;
import reading.project.global.member.entity.Member;
import reading.project.global.member.mapper.MemberMapper;
import reading.project.global.member.repository.MemberRepository;

import java.util.Optional;

@RequiredArgsConstructor
@Transactional
@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final MemberMapper mapper;

    private final PasswordEncoder passwordEncoder;

    public void createMember(MemberDto.Post requestBody) {
        verifyExistUserName(requestBody.getUserName());
        Member member =mapper.memberDtoPostToMember(requestBody);
        member.changePassword(passwordEncoder.encode(member.getPassword()));
        //역할 부여 필요
        this.memberRepository.save(member);
    }

    public MemberDto.Response updateMember(long memberId, MemberDto.Patch requestBody) {
        return this.mapper.memberToMemberDtoResponse(this.findExistsMember(memberId).update(requestBody));
    }

    public MemberDto.Response findMember(long memberId) {
        return this.mapper.memberToMemberDtoResponse(this.findExistsMember(memberId));
    }

    public void deleteMember(long memberId) {
        this.memberRepository.delete(this.findExistsMember(memberId));
    }

    public Member findExistsMember(long memberId) {
        return this.memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));
    }

    public Member findExistsMember(String userName) {
        return this.memberRepository.findByUserName(userName)
                .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));
    }

    public void verifyExistUserName(String userName){
        if(memberRepository.findByUserName(userName).isPresent()){
            throw new CustomException(ErrorCode.MEMBER_EXISTS);
        }
    }

}
