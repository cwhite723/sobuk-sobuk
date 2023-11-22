package reading.project.domain.image.dto;

import lombok.Getter;

@Getter
public class ImageResponse {
    private Long imageId;
    private String imageUrl;

    public ImageResponse(Long imageId, String imageUrl) {
        this.imageId = imageId;
        this.imageUrl = imageUrl;
    }
}
