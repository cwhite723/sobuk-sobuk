package reading.project.global.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.*;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {
    // 400
    REQUEST_VALIDATION_FAIL(HttpStatus.BAD_REQUEST, "잘못된 요청 값입니다."),

    // 401

    // 404
    NOT_FOUND_BOOK(NOT_FOUND, "도서 정보가 존재하지 않습니다."),
    NOT_FOUND_RECORD(NOT_FOUND, "독서 기록이 존재하지 않습니다."),

    // 409
    NOT_AUTHOR(CONFLICT, "작성자가 아닙니다."),

    // 500
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "서버 내부 오류입니다. 관리자에게 문의하세요."),

    ;

    private final HttpStatus httpStatus;
    private final String message;
}
