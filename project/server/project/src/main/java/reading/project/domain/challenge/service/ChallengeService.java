package reading.project.domain.challenge.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reading.project.domain.book.entity.Book;
import reading.project.domain.book.service.BookService;
import reading.project.domain.challenge.dto.request.ChallengeRequest;
import reading.project.domain.challenge.entity.Challenge;
import reading.project.domain.challenge.entity.ChallengeMember;
import reading.project.domain.challenge.repository.ChallengeMemberRepository;
import reading.project.domain.challenge.repository.ChallengeRepository;
import reading.project.domain.member.entity.Member;
import reading.project.domain.member.service.MemberService;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ChallengeService {
    private final ChallengeRepository challengeRepository;
    private final ChallengeMemberRepository challengeMemberRepository;
    private final BookService bookService;
    private final MemberService memberService;

    public Long createChallenge(Long bookId, Long loginId, ChallengeRequest request) {
        Book book = bookService.findBookById(bookId);
        Member member = memberService.findExistsMember(loginId);

        Challenge challenge = request.toEntity(book);
        challengeRepository.save(challenge);
        challengeMemberRepository.save(ChallengeMember.of(true, false, challenge, member));

        return challenge.getId();
    }
}
