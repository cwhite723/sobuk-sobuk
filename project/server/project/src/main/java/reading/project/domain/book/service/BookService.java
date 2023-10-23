package reading.project.domain.book.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reading.project.domain.book.dto.request.BookRequest;
import reading.project.domain.book.dto.request.FilterCondition;
import reading.project.domain.book.dto.response.BookResponse;
import reading.project.domain.book.entity.Book;
import reading.project.domain.book.repository.BookRepository;
import reading.project.global.exception.CustomException;

import java.util.Optional;

import static reading.project.global.exception.ErrorCode.NOT_FOUND_BOOK;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BookService {
    private final BookRepository bookRepository;

    @Transactional
    public Long registerBook(BookRequest request) {
        Book findBook = bookRepository.findBookByTitleAndPublisherAndAuthor(request.getTitle(), request.getPublisher(), request.getAuthor())
                .orElseGet(() -> bookRepository.save(request.toEntity()));

        return findBook.getId();
    }

    @Transactional
    public void updateBook(Long bookId, BookRequest request) {
        Book findBook = findBookById(bookId);
        findBook.update(request.getTitle(), request.getPublisher(), request.getAuthor(), request.getPublicationDate(), request.getPageNumber(), request.isUserInput());
    }

    @Transactional
    public void deleteBook(Long bookId) {
        bookRepository.deleteById(bookId);
    }

    public BookResponse getBook(Long bookId) {
        Book book = findBookById(bookId);

        return bookRepository.getBook(bookId);
    }

    public Page<BookResponse> getBooks(FilterCondition filterCondition,
                                       Pageable pageable) {
        Page<BookResponse> responses = bookRepository.findBooksByFilterCondition(filterCondition, pageable);

        return responses;
    }

    public Book findBookById(Long bookId) {

        return bookRepository.findById(bookId)
                .orElseThrow(() -> new CustomException(NOT_FOUND_BOOK));
    }

}
