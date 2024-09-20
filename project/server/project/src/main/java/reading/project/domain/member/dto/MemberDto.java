package reading.project.domain.member.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;


public abstract class MemberDto {
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class Post {
        @NotBlank(message = "공백이 아니어야 합니다.")
        private String userName;
        @NotBlank(message = "공백이 아니어야 합니다.")
        @Pattern(regexp = "^[A-Za-z\\d!@#$%^&*()_+~\\-=]{6,15}$", message = "영문,숫자,특수문자 포함 6~15글자 입니다.")
        private String password;
        @NotBlank(message = "공백이 아니어야 합니다.")
        private String nickname;
        @Email(message = "이메일 형식이 올바르지 않습니다.")
        private String email;
        private String introduction;
    }
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class PostUN {
        @NotBlank(message = "공백이 아니어야 합니다.")
        private String userName;
    }
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class PostNN {
        @NotBlank(message = "공백이 아니어야 합니다.")
        private String nickname;
    }
    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class Patch {
        @NotBlank(message = "공백이 아니어야 합니다.")
        private String nickname;
        @NotBlank(message = "공백이 아니어야 합니다.")
        private String introduction;
        private String image;
    }

    @Getter
    @AllArgsConstructor
    @Builder
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class Response {
        private Long memberId;
        private String userName;
        private String password;
        private String nickname;
        private String email;
        private String introduction;
        private String image;
    }
}
