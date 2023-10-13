package reading.project.domain.book.dto.request;

import lombok.Builder;
import lombok.Getter;

@Getter
public class FilterCondition {
    private String title;
    private String author;
    private String sortType;

    @Builder
    public FilterCondition(String title, String author, String sortType) {
        this.title = title;
        this.author = author;
        this.sortType = sortType;
    }
}
