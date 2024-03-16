package reading.project.domain.book.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reading.project.domain.book.entity.Genre;
import reading.project.domain.book.repository.GenreRepository;
import reading.project.global.exception.CustomException;
import reading.project.global.exception.ErrorCode;

import static reading.project.global.exception.ErrorCode.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GenreService {
    private final GenreRepository genreRepository;

    public Genre getGenreById(Long id) {

        return genreRepository.findById(id)
                .orElseThrow(() -> new CustomException(GENRE_NOT_FOUND));
    }
}
