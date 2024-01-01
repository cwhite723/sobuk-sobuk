import { Box } from "@mui/material";
import TabMenu from "components/blocks/TabMenu";
import PlanList from "components/blocks/member/PlanList";
import IntroProfile from "components/blocks/member/IntroProfile";
import PostList from "components/blocks/member/PostList";
import Setting from "components/blocks/member/Setting";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getStoredMember, getStoredToken } from "utils/get";
import { userTabMenus } from "constants/menus";
import useMemberInfoQuery from "hooks/queries/members/useMemberInfoQuery";
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

      {/* 유저페이지 수정 선택시 표출 영역 */}
      {nowTab.value === "SETTING" &&
        (isMyPage ? (
          <Setting />
        ) : (
          <CustomTypography
            text="정보 수정은 내 서재에서만 가능합니다."
            variant="body1"
            bold={true}
          />
        ))}
    </Box>
  );
};
export default MemberPage;
