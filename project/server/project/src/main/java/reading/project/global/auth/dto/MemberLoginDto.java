package reading.project.global.auth.dto;

import lombok.Getter;
///////////////////////////////////////////
//LoginDTO 클래스는 클라이언트가 전송한
// Username/Password 정보를 Security Filter에서
// 사용할 수 있도록 역직렬화(Deserialization)
// 하기 위한 DTO 클래스
///////////////////////////////////////////
@Getter
public class MemberLoginDto {
    private String userName;
    private String password;
}