import { Box } from "@mui/material";
import TabMenu from "components/blocks/TabMenu";
import PlanList from "components/blocks/member/PlanList";
import IntroProfile from "components/blocks/member/IntroProfile";
import PostList from "components/blocks/member/PostList";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getStoredMember, getStoredToken } from "utils/get";
import { userTabMenus } from "constants/menus";
import { useMemberInfoQuery } from "hooks/queries/useMemberQueries";
import SmallButton from "components/atoms/SmallButton";
import CustomLink from "components/atoms/CustomLink";
import CustomTypography from "components/atoms/CustomTypography";

const MemberPage = () => {
  // 해당 UserPage의 path값 가져오기(my 페이지 인지 확인)
  const { pathname } = useLocation();

  // 해당 UserPage의 주인 정보 가져오기
  const { memberid } = useParams() as { memberid: string };
  const memberId = memberid ? parseInt(memberid, 10) : null;

  // 로그인 여부 확인 token
  const memberToken = getStoredToken();
  const memberInfo = getStoredMember();

  // my 페이지 확인
  const isMyPage = pathname === "/my" ? true : false;

  // 수정/탈퇴 메뉴 선택 여부
  const [memberEdit, setMemberEdit] = useState(false);

  // 현재 선택된 탭 메뉴
  const [nowTab, setNowTab] = useState(userTabMenus[0]);

  // 현재 페이지의 주인 유저 정보
  const [owner, setOwner] = useState<MemberInfo | OtherMemberInfo | null>(null);

  // react-query - GET member info - myPage가 아닐 경우
  const { data: memberInfoData, isSuccess: isMemberInfoSuccess } =
    useMemberInfoQuery(memberId, memberToken, {
      enabled: !!memberId && !!memberToken,
    });

  // 선택된 탭 메뉴를 변경하는 함수
  const handelTabFocus = (newSelectMenu: TabMenuType) => {
    setNowTab(newSelectMenu);
  };

  // 회원 정보 수정 및 탈퇴 버튼 이벤트 함수
  const handleSetting = () => {
    setMemberEdit(true);
  };

  useEffect(() => {
    if (isMyPage && memberInfo) {
      setOwner(memberInfo);
    }
    if (isMemberInfoSuccess && memberInfoData) {
      setOwner(memberInfoData.data);
    }
  }, [isMemberInfoSuccess]);

  return (
    <Box sx={{ width: "100%" }}>
      {/* 유저(내서재) 페이지 상단바 */}
      <TabMenu
        handelTabFocus={handelTabFocus}
        allTabs={userTabMenus}
        nowTab={nowTab}
      />

      {/* 회원 정보 수정 및 탈퇴 버튼 */}
      <Box sx={{ position: "fixed", top: "100px", right: "50px" }}>
        <CustomLink to="../my-setting">
          <CustomTypography text="수정/탈퇴" variant="body1" bold={true} />
        </CustomLink>
      </Box>

      {/* 유저페이지 전체 container 영역(기본) */}
      {/* 상단 메뉴 선택에 따라 바뀌어야 하는 영역 */}

      {/* 유저페이지 소개 선택시 표출 영역 */}
      {owner && nowTab.value === "INTRO" && (
        <Box>
          {/* 소개(intro) 선택시 */}
          <IntroProfile memberInfo={owner} memberId={memberId} />

          {/* 유저 서재 도서 미리보기 */}
          {/* 최신순 3개만 보여줌 */}
          <PlanList
            memberInfo={owner}
            memberId={memberId}
            isMyPage={isMyPage}
            isPreview={true}
          />

          {/* 유저 독서 기록 미리보기 */}
          {/* 최신순 3개만 보여줌 */}
          <PostList
            memberInfo={owner}
            memberId={memberId}
            isMyPage={isMyPage}
            isPreview={true}
          />
        </Box>
      )}

      {/* 유저페이지 서재 선택시 표출 영역 */}
      {/* 전체도서 표출 - 무한스크롤 */}
      {owner && nowTab.value === "LIB" && (
        <PlanList
          memberInfo={owner}
          memberId={memberId}
          isMyPage={isMyPage}
          isPreview={false}
        />
      )}

      {/* 유저페이지 독서기록 선택시 표출 영역 */}
      {owner && nowTab.value === "POST" && (
        <PostList
          memberInfo={owner}
          memberId={memberId}
          isMyPage={isMyPage}
          isPreview={false}
        />
      )}
    </Box>
  );
};
export default MemberPage;
