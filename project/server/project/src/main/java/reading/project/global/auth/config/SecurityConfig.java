package reading.project.global.auth.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import reading.project.global.auth.handler.MemberAccessDeniedHandler;
import reading.project.global.auth.handler.MemberAuthenticationEntryPoint;
import reading.project.global.auth.handler.MemberAuthenticationFailureHandler;
import reading.project.global.auth.handler.MemberAuthenticationSuccessHandler;
import reading.project.global.auth.jwt.JwtAuthenticationFilter;
import reading.project.global.auth.jwt.JwtTokenizer;
import reading.project.global.auth.jwt.JwtVerificationFilter;
import reading.project.global.auth.user.MemberCustomAuthorityUtils;
import reading.project.global.member.service.MemberService;

import java.util.Arrays;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration
@EnableWebSecurity(debug = true)
@RequiredArgsConstructor
public class SecurityConfig {

    private static final String[] WHITE_LIST_URL = {"/book/**"
    };

    private final JwtTokenizer jwtTokenizer;
    private final MemberCustomAuthorityUtils authorityUtils;

//    private final MemberService memberService;

// 후기 작성한 글만 필요 로그인만 책정보 책리스트 전체공개

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable) //crossSite 방지
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .sessionManagement(session -> session.sessionCreationPolicy(STATELESS))
                .authorizeHttpRequests(req -> req
                        .requestMatchers(new AntPathRequestMatcher("/member/**", "PATCH")).hasRole("USER")
                        .requestMatchers(new AntPathRequestMatcher("/member/**", "DELETE")).hasRole("USER")
                        .anyRequest().permitAll())
                .httpBasic(AbstractHttpConfigurer::disable) //uri가아닌 토큰인증을 한다.
                .formLogin(AbstractHttpConfigurer::disable)
                .exceptionHandling(exceptionHandling ->
                        exceptionHandling
                                .authenticationEntryPoint(new MemberAuthenticationEntryPoint())
                                .accessDeniedHandler(new MemberAccessDeniedHandler()))
                .apply(new CustomFilterConfigurer());
        return http.build();
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer,HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {

            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager,jwtTokenizer);
            jwtAuthenticationFilter.setFilterProcessesUrl("/user/log-in");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer,authorityUtils);

            builder.addFilter(jwtAuthenticationFilter);
            builder.addFilterAfter(jwtVerificationFilter,JwtAuthenticationFilter.class);

        }
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowCredentials(true);
        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("*"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.addExposedHeader("Authorization");
        configuration.addExposedHeader("Refresh");
        configuration.addExposedHeader("roles");
        configuration.addExposedHeader("memberId");


        org.springframework.web.cors.UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**",configuration);
        return source;
    }


}