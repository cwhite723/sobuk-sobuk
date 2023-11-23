package reading.project.domain.image.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import reading.project.domain.image.dto.ImageResponse;
import reading.project.domain.image.service.ImageService;
import reading.project.global.response.ApplicationResponse;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/images")
public class ImageController {
    private final ImageService imageService;

    @PostMapping
    public ApplicationResponse<ImageResponse> uploadImage(@RequestPart MultipartFile file) {
        ImageResponse response = imageService.saveImage(file);

        return ApplicationResponse.ok(response);
    }
}
