package reading.project.global.auth.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import reading.project.global.auth.jwt.JwtAuthenticationFilter;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;
import static reading.project.global.member.entity.Member.Role.ROLE_ADMIN;
import static reading.project.global.member.entity.Member.Role.ROLE_USER;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfig {

    private static final String[] WHITE_LIST_URL = {"/member/log-in",
    };

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

// 후기 작성한 글만 필요 로그인만 책정보 책리스트 전체공개


    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable) //crossSite 방지
                .httpBasic(AbstractHttpConfigurer::disable) //uri가아닌 토큰인증을 한다.
//                .cors(source -> corsConfigurationSource())
                .authorizeHttpRequests(req ->
                                req.requestMatchers(WHITE_LIST_URL).permitAll()
//                                        .requestMatchers("/member/**").hasAnyRole(ROLE_ADMIN.name(), ROLE_USER.name())
//                                .requestMatchers(POST,"/member/**").hasAnyAuthority() 어드민 권한 주기
                                        .anyRequest()
                                        .authenticated() // 여긴 막아놓는 곳(인증필요로)
                )
                .sessionManagement(session -> session.sessionCreationPolicy(STATELESS))
                .authenticationProvider(authenticationProvider) //사용자의 인증을 시도하고, 성공할 경우  객체 반환 실패시 exception
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();


    }


//    @Bean
//    public CorsConfigurationSource corsConfigurationSource(){
//        CorsConfiguration configuration = new CorsConfiguration();
//
//        configuration.setAllowCredentials(true);
//        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
//        configuration.setAllowedMethods(Arrays.asList("*"));
//        configuration.setAllowedHeaders(Arrays.asList("*"));
//        configuration.addExposedHeader("Authorization");
//        configuration.addExposedHeader("Refresh");
//        configuration.addExposedHeader("roles");
//        configuration.addExposedHeader("memberId");
//        configuration.addExposedHeader("adminId");
//
//
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**",configuration);
//        return source;
//    }
}
