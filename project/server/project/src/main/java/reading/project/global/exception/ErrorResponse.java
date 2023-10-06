package reading.project.global.exception;

public record ErrorResponse(
    String errorCode,
    String message
) {
    public static ErrorResponse from(ErrorCode errorCode) {
        return new ErrorResponse(errorCode.name(), errorCode.getMessage());
    }
}
