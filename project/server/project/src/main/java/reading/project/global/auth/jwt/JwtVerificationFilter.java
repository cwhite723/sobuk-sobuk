package reading.project.global.auth.jwt;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import reading.project.global.auth.user.MemberCustomAuthorityUtils;


import java.io.IOException;
import io.jsonwebtoken.security.SignatureException;
import reading.project.global.member.entity.Member;

import java.util.List;
import java.util.Map;
///////////////////////////////////////////
//JWT를 검증하는 전용 Security Filter를 구현
///////////////////////////////////////////
@RequiredArgsConstructor
public class JwtVerificationFilter extends OncePerRequestFilter {
    private final JwtTokenizer jwtTokenizer;
    private final MemberCustomAuthorityUtils authorityUtils;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            Map<String,Object> claims = verifyJws(request);
            setAuthenticationToContext(claims);

        } catch (SignatureException se) {
            request.setAttribute("exception", se);
        } catch (ExpiredJwtException ee){
            request.setAttribute("exception", ee);
        } catch (Exception e) {
            request.setAttribute("exception", e);
        }

        filterChain.doFilter(request,response);
    }

    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String authorization = request.getHeader("Authorization");

        return authorization == null || !authorization.startsWith("Bearer");
    }

    private Map<String,Object> verifyJws(HttpServletRequest request) {
        String jws = request.getHeader("Authorization").replace("Bearer ","");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        Map<String,Object> claims = jwtTokenizer.getClaims(jws,base64EncodedSecretKey).getBody();

        return claims;
    }

    private void setAuthenticationToContext(Map<String,Object> claims) {
        String userName =(String) claims.get("userName");
        Member.Role role = Member.Role.valueOf((String) claims.get("roles"));
        List<GrantedAuthority> authorities = authorityUtils.createAuthorities(role.name());
        Authentication authentication = new UsernamePasswordAuthenticationToken(userName,null,authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
