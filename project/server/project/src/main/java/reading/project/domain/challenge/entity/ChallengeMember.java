package reading.project.domain.challenge.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import reading.project.domain.member.entity.Member;

import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;
import static org.hibernate.annotations.OnDeleteAction.CASCADE;

@Getter
@NoArgsConstructor(access = PROTECTED)
@Entity
@Table(name = "challenge_member")
public class ChallengeMember {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "challenge_member_id")
    private Long id;

    @Column(name = "host")
    private boolean host;

    @Column(name = "success")
    private boolean success;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "challenge_id", nullable = false)
    @OnDelete(action = CASCADE)
    private Challenge challenge;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    @OnDelete(action = CASCADE)
    private Member member;

    private ChallengeMember(boolean host, boolean success, Challenge challenge, Member member) {
        this.host = host;
        this.success = success;
        this.challenge = challenge;
        this.member = member;
    }

    public static ChallengeMember of(boolean host, boolean success, Challenge challenge, Member member) {
        return new ChallengeMember(host, success, challenge, member);
    }
}
