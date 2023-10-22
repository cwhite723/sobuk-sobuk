package reading.project.global.member.mapper;
import org.springframework.stereotype.Component;
import reading.project.global.member.dto.MemberDto;
import reading.project.global.member.entity.Member;

@Component
public class MemberMapper {
    public Member memberDtoPostToMember(MemberDto.Post memberPost) {
        return Member.builder()
                .userName(memberPost.getUserName())
                .password(memberPost.getPassword())
                .nickname(memberPost.getNickname())
                .email(memberPost.getEmail())
                .introduction(memberPost.getIntroduction())
                .build();
    }

    public Member memberDtoPatchToMember(MemberDto.Patch memberPatch) {
        return Member.builder()
                .nickname(memberPatch.getNickname())
                .introduction(memberPatch.getIntroduction())
                .image(memberPatch.getImage())
                .build();
    }

    public MemberDto.Response memberToMemberDtoResponse(Member member) {
        return MemberDto.Response.builder()
                .memberId(member.getMemberId())
                .userName(member.getUserName())
                .password(member.getPassword())
                .nickname(member.getNickname())
                .email(member.getEmail())
                .introduction(member.getIntroduction())
                .image(member.getImage())
                .build();
    }
}