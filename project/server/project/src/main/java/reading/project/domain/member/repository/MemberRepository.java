package reading.project.domain.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import reading.project.domain.member.entity.Member;


import java.util.Optional;


public interface MemberRepository extends JpaRepository<Member, Long>, MemberRepositoryCustom {
    Optional<Member> findByUserName(String userName);

}
