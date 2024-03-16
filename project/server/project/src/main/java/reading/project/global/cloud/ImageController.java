package reading.project.global.cloud;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import reading.project.global.response.ApplicationResponse;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/images")
public class ImageController {
    private final ImageService imageService;

    @PostMapping
    public ApplicationResponse<String> uploadImage(@RequestPart MultipartFile file) {
        String url = imageService.saveImage(file);

        return ApplicationResponse.ok(url);
    }
}
