package reading.project.domain.auth.utils;


import com.google.gson.Gson;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import reading.project.global.exception.ErrorCode;
import reading.project.global.exception.ErrorResponse;


import java.io.IOException;
///////////////////////////////////////////
//ErrorResponse를 클라이언트에게 전송하기 위한
//ErrorResponder 클래스
///////////////////////////////////////////
public class ErrorResponder {
    public static void sendErrorResponse(HttpServletResponse response, HttpStatus status) throws IOException {
        Gson gson = new Gson();
        ErrorResponse errorResponse = ErrorResponse.of(status);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(status.value());
        response.getWriter().write(gson.toJson(errorResponse, ErrorResponse.class));
    }

    public static void sendAuthorizedErrorResponse(HttpServletResponse response, HttpStatus status) throws IOException {
        Gson gson = new Gson();
        ErrorResponse errorResponse = ErrorResponse.builder()
                .errorCode(String.valueOf(ErrorCode.MEMBER_NOT_AUTHORIZED))
                .message(ErrorCode.MEMBER_NOT_AUTHORIZED.getMessage())
                .build();

        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(status.value());
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(gson.toJson(errorResponse, ErrorResponse.class));
    }
}