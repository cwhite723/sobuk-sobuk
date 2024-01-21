package reading.project.domain.auth.handler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;
import reading.project.domain.auth.jwt.JwtTokenizer;
import reading.project.domain.auth.user.GoogleUserInfo;
import reading.project.domain.auth.user.KakaoUserInfo;
import reading.project.domain.auth.user.MemberCustomAuthorityUtils;
import reading.project.domain.auth.user.OAuth2UserInfo;
import reading.project.domain.member.dto.MemberDto;
import reading.project.domain.member.entity.Member;
import reading.project.domain.member.mapper.MemberMapper;
import reading.project.domain.member.service.MemberService;
import reading.project.global.config.redis.util.RedisDao;
import reading.project.global.exception.CustomException;
import reading.project.global.exception.ErrorCode;

import java.io.IOException;
import java.net.URI;
import java.util.*;

@RequiredArgsConstructor
public class OAuth2MemberSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtTokenizer jwtTokenizer;
    private final MemberCustomAuthorityUtils memberCustomAuthorityUtils;
    private final MemberService memberService;
    private final RedisDao redisDao;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        var oAuth2User = (OAuth2User)authentication.getPrincipal();
        OAuth2UserInfo oAuth2UserInfo = null;
        String check = String.valueOf(oAuth2User.getAttributes().get("kakao_account"));
        if(check != "null") {
            oAuth2UserInfo = new KakaoUserInfo(oAuth2User.getAttributes());
        } else{
            oAuth2UserInfo = new GoogleUserInfo(oAuth2User.getAttributes());
        }
        String password = new BCryptPasswordEncoder().encode(UUID.randomUUID().toString());
        String email = oAuth2UserInfo.getEmail();
        String name = oAuth2UserInfo.getName();

        List<String> authorities = memberCustomAuthorityUtils.createRoles(email);


        Member member;
        try {
            member = saveMember(email, name, password);
            redirect(request, response, member, authorities);
        }catch (Exception e){
            redirect(request, response, memberService.findExistsMember(name), authorities);
        }
    }

    private Member saveMember(String email, String name, String password) {
        Member member = new Member(email,name,password);

        return memberService.createMember(member);
    }

    public void redirect(HttpServletRequest request, HttpServletResponse response, Member member, List<String> authorities) throws IOException {

        String refreshToken = delegateRefreshToken(member.getEmail());
        String accessToken = delegateAccessToken(member, authorities);
        String addedAccessToken = "Bearer " + accessToken;

        if(redisDao.hashKeyBlackList(accessToken)) throw new CustomException(ErrorCode.INVALID_ACCESSTOKEN);

        response.setHeader("Authorization", addedAccessToken);
        response.setHeader("Refresh", refreshToken);
        response.setHeader("roles", "user");
        response.setHeader("memberId", String.valueOf(member.getId()));

        redisDao.setValues(member.getUserName(), refreshToken);

        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");
        Member fm = memberService.findExistsMember(member.getId());
        response.getWriter().write(fm.getUserName());


        String uri = createURI(addedAccessToken, refreshToken).toString();
        getRedirectStrategy().sendRedirect(request, response, uri);
    }

    private String delegateAccessToken(Member member, List<String> authorities) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("memberId", member.getId());
        claims.put("username", member.getUserName());
        claims.put("roles", authorities);
        ;
        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    private String delegateRefreshToken(String username) {
        String subject = username;
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }

    private URI createURI(String accessToken, String refreshToken) {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("Authorization", accessToken);
        queryParams.add("Refresh", refreshToken);

        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
                .host("sobuk-sobuk-app-2023.s3-website.ap-northeast-2.amazonaws.com")
                .port(3000)
                .path("/")
                .queryParams(queryParams)
                .build()
                .toUri();
    }
}
