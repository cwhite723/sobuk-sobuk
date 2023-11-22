package reading.project.domain.image.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import reading.project.global.base.BaseEntity;

import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Getter
@Entity
@Table(name = "images")
@NoArgsConstructor(access = PROTECTED)
public class Image extends BaseEntity {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "image_id")
    private Long id;

    @Column(nullable = false)
    private String fileName;

    @Column(nullable = false)
    private String storeImagePath;

    @Builder
    public Image(final String fileName, final String storeImagePath) {
        this.fileName = fileName;
        this.storeImagePath = storeImagePath;
    }
}
