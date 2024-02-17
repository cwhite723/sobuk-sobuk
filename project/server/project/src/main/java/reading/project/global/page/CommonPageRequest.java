package reading.project.global.page;

import lombok.Getter;
import org.springframework.data.domain.PageRequest;

@Getter
public class CommonPageRequest {
    private final int DEFAULT_PAGE = 1;
    private final int DEFAULT_SIZE = 10;
    private final int MAX_SIZE = 50;

    private int page;
    private int size;

    public CommonPageRequest() {
        setPage(DEFAULT_PAGE);
        setSize(DEFAULT_SIZE);
    }

    public CommonPageRequest(int page, int size) {
        setPage(page);
        setSize(size);
    }

    public void setPage(int page) {
        this.page = page <= 0 ? DEFAULT_PAGE : page;
    }

    public void setSize(int size) {
        this.size = size > MAX_SIZE ? DEFAULT_SIZE : size;
    }

    public PageRequest of() {

        return PageRequest.of(page - 1, size);
    }
}
