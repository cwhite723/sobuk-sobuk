package reading.project.domain.book.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reading.project.domain.book.entity.Book;
import reading.project.domain.book.entity.Bookmark;
import reading.project.domain.book.repository.BookmarkRepository;
import reading.project.global.member.entity.Member;
import reading.project.global.member.service.MemberService;

import java.util.Optional;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class BookmarkService {
    private final BookmarkRepository bookmarkRepository;
    private final BookService bookService;
    private final MemberService memberService;

    @Transactional
    public void toggleBookmark(Long loginId, Long bookId) {
        Book book = bookService.findBookById(bookId);
        Member member = memberService.findExistsMember(loginId);

        Optional<Bookmark> bookmark = bookmarkRepository.findByBookIdAndMemberId(bookId, loginId);
        if (bookmark.isPresent()) {
            bookmarkRepository.delete(bookmark.get());
        } else {
            bookmarkRepository.save(Bookmark.of(book, member));
        }
    }
}
