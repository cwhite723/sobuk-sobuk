package reading.project.domain.record.dto.request;

import lombok.Builder;
import lombok.Getter;

@Getter
public class StatusFilter {
    private Boolean reading;
    private Boolean completed;
    private Boolean pending;

    @Builder
    public StatusFilter(Boolean reading, Boolean completed, Boolean pending) {
        this.reading = reading;
        this.completed = completed;
        this.pending = pending;
    }
}
