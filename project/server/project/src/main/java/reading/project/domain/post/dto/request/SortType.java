package reading.project.domain.post.dto.request;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum SortType {
    DATE("최신순"),
    COMMENT("댓글순"),
    LIKE("추천순");

    private final String value;

    SortType(String value) {
        this.value = value;
    }

    @JsonCreator
    public static SortType from(String value) {
        for (SortType sortType : SortType.values()) {
            if (sortType.getValue().equals(value)) {
                return sortType;
            }
        }

        return null;
    }

    @JsonValue
    public String getValue() {
        return value;
    }
}
