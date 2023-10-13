package reading.project.global.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Getter;

@JsonPropertyOrder({"success", "data"})
@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
public class ApplicationResponse<T> {
    private final Boolean success;
    private final T data;

    ApplicationResponse(Boolean success, T data) {
        this.success = success;
        this.data = data;
    }

    public static <T> ApplicationResponse<T> ok(T data) {
        return new ApplicationResponse<>(true, data);
    }

    public static ApplicationResponse<Void> noData() {
        return new ApplicationResponse<>(true, null);
    }
}
