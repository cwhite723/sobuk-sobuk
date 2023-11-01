package reading.project.domain.book.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import reading.project.domain.book.dto.request.BookRequest;
import reading.project.domain.book.dto.request.FilterCondition;
import reading.project.domain.book.dto.response.BookDetailResponse;
import reading.project.domain.book.dto.response.BookResponse;
import reading.project.domain.book.service.BookService;
import reading.project.global.page.CommonPageRequest;
import reading.project.global.response.ApplicationResponse;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/books")
public class BookController {
    private final BookService bookService;

    @PostMapping
    @ResponseStatus(CREATED)
    public ApplicationResponse<Long> registerBook(@RequestBody BookRequest request) {
        Long bookId = bookService.registerBook(request);

        return ApplicationResponse.ok(bookId);
    }

    @PatchMapping("/{book-id}")
    @ResponseStatus(OK)
    public ApplicationResponse<Long> updateBook(@PathVariable("book-id") Long bookId, @RequestBody BookRequest request) {
        bookService.updateBook(bookId, request);

        return ApplicationResponse.ok(bookId);
    }

    @DeleteMapping("/{book-id}")
    @ResponseStatus(OK)
    public ApplicationResponse<Void> deleteBook(@PathVariable("book-id") Long bookId) {
        bookService.deleteBook(bookId);

        return ApplicationResponse.noData();
    }

    @GetMapping("/{book-id}")
    @ResponseStatus(OK)
    public ApplicationResponse<BookDetailResponse> getBook(@PathVariable("book-id") Long bookId) {
        BookDetailResponse response = bookService.getBookDetails(bookId);

        return ApplicationResponse.ok(response);
    }

    @GetMapping
    @ResponseStatus(OK)
    public ApplicationResponse<Page<BookResponse>> getBooks(FilterCondition filterCondition,
                                                            CommonPageRequest pageRequest) {
        Page<BookResponse> responses = bookService.getBooks(filterCondition, pageRequest.of());

        return ApplicationResponse.ok(responses);
    }

    @PostMapping("/{book-id}/bookmark")
    @ResponseStatus(OK)
    public ApplicationResponse<Void> toggleBookmark(@PathVariable("book-id") Long bookId) {
        //TODO: 토큰 받아와서 사용하도록 변경
        Long loginId = 1L;
        bookService.toggleBookmark(loginId, bookId);

        return ApplicationResponse.noData();
    }
}
