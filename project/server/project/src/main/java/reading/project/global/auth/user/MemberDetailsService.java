package reading.project.global.auth.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import reading.project.global.exception.CustomException;
import reading.project.global.exception.ErrorCode;
import reading.project.global.member.entity.Member;
import reading.project.global.member.repository.MemberRepository;

import java.util.Collection;
import java.util.Optional;

///////////////////////////////////////////
// 데이터베이스에서 사용자의 크리덴셜을 조회한 후,
// 조회한 크리덴셜을 AuthenticationManager에게
// 전달하는 Custom UserDetailsService를 구현
///////////////////////////////////////////

@Slf4j
@Component
@RequiredArgsConstructor
public class MemberDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    private final MemberCustomAuthorityUtils authorityUtils;


    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        Optional<Member> optionalMember = memberRepository.findByUserName(userName);
        Member findMember = optionalMember.orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));
        return new MemberDetails(findMember);
    }

    private final class MemberDetails extends Member implements UserDetails {
        private Member member;

        MemberDetails(Member member){
            super(member.getId(),
                    member.getUserName(),
                    member.getPassword(),
                    member.getNickname(),
                    member.getEmail(),
                    member.getIntroduction(),
                    member.getImage() ,
                    member.getRole());
        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return authorityUtils.createAuthorities(getUserName());
        }

        @Override
        public String getUsername() {
            return getUserName();
        }

        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isEnabled() {
            return true;
        }
    }
}
