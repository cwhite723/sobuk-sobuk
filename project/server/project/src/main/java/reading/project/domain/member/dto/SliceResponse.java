package reading.project.domain.member.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class SliceResponse<T> {

    private List<T> data;
    private boolean hasNext;
    private int pageSize;

    public SliceResponse(List<T> data, boolean hasNext, int pageSize) {
        this.data = data;
        this.hasNext = hasNext;
        this.pageSize = pageSize;
    }
}
