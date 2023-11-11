package reading.project.domain.auth.jwt;

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
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import reading.project.domain.auth.user.MemberCustomAuthorityUtils;


import java.io.IOException;
import io.jsonwebtoken.security.SignatureException;
import reading.project.domain.auth.utils.HeaderUtil;
import reading.project.global.config.redis.util.RedisDao;
import reading.project.global.exception.CustomException;
import reading.project.global.exception.ErrorCode;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

///////////////////////////////////////////
//JWT를 검증하는 전용 Security Filter를 구현
///////////////////////////////////////////
@RequiredArgsConstructor
public class JwtVerificationFilter extends OncePerRequestFilter {
    private final JwtTokenizer jwtTokenizer;
    private final MemberCustomAuthorityUtils authorityUtils;

    private final RedisDao redisDao;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String accessToken = HeaderUtil.getAccessToken(request);
        if (accessToken == null) {
            throw new CustomException(ErrorCode.EMPTY_TOKEN);
        }

        if(redisDao.hashKeyBlackList(accessToken)) {
            throw new CustomException(ErrorCode.INVALID_ACCESSTOKEN);
        }
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
        String jws = request.getHeader("Authorization").replace("Bearer","");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        Map<String,Object> claims = jwtTokenizer.getClaims(jws,base64EncodedSecretKey).getBody();

        return claims;
    }
    private void setAuthenticationToContext(Map<String, Object> claims) {
        String userName =(String) claims.get("userName");
        List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List)claims.get("roles"));
        Authentication authentication = new UsernamePasswordAuthenticationToken(userName,null,authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
