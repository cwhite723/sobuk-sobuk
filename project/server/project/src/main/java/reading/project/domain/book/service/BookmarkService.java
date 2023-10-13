package reading.project.domain.book.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reading.project.domain.book.repository.BookmarkRepository;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class BookmarkService {
    private final BookmarkRepository bookmarkRepository;
    private final BookService bookService;
//    private final MemberService memberService;

    @Transactional
    public void toggleBookmark(Long loginId, Long bookId) {
        /*Book book = bookService.findBookById(bookId);
        Member member = memberService.findMemberById(loginId);

        Optional<Bookmark> bookmark = bookmarkRepository.findByBookIdAndMemberId(bookId, loginId);
        if (bookmark.isPresent()) {
            bookmarkRepository.delete(bookmark.get());
        } else {
            bookmarkRepository.save(Bookmark.of(book, member));
        }*/
    }
}
