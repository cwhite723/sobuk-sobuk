import { Box } from "@mui/material";
import { getMember } from "apis/members";
import CommonTabMenu from "components/common/CommonTabMenu";
import UserPlanList from "components/user/UserPlanList";
import UserIntroProfile from "components/user/UserIntroProfile";
import UserPostList from "components/user/UserPostList";
import UserSetting from "components/user/UserSetting";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { RootState } from "store/store";

// 내 서재 서브 탭 메뉴 데이터
const userTabMenus: TabMenuType[] = [
  { label: "⛄소개", value: "INTRO" },
  { label: "📚서재", value: "LIB" },
  { label: "📓독서기록", value: "POST" },
  { label: "🔐계정정보/탈퇴", value: "SETTING" },
];

const UserPage = () => {
  // 해당 UserPage의 path값 가져오기(my 페이지 인지 확인)
  const { pathname } = useLocation();

  // 해당 UserPage의 주인 정보 가져오기
  const { userid } = useParams() as { userid: string };
  const memberId = userid ? parseInt(userid) : null;

  // 해당 UserPage의 주인 정보가 담긴 state
  const [owner, setOwner] = useState<OtherMemberInfo | MemberInfo>();

  // 로그인 여부 확인 token
  const memberToken = useSelector((state: RootState) => state.auth.token);
  const storedMemberInfo = JSON.parse(
    useSelector((state: RootState) => state.auth.member),
  );

  // my 페이지 확인
  const isMyPage = pathname === "/my";

  // 현재 선택된 탭 메뉴
  const [nowTab, setNowTab] = useState(userTabMenus[0]);

  // react-query - GET member info - myPage가 아닐 경우
  const { data: memberInfoData } = useQuery(
    ["getMemberInfo", memberId, memberToken],
    () => getMember({ memberId, accessToken: memberToken }),
    {
      onSuccess: (data) => {
        // 성공했을 때
        if (data) {
          setOwner(data.data);
        }
      },
      onError: (error) => {
        console.log(error);
      },
      enabled: !!memberId && !!memberToken,
    },
  );

  // 선택된 탭 메뉴를 변경하는 함수
  const handelTabFocus = (newSelectMenu: TabMenuType) => {
    setNowTab(newSelectMenu);
  };

  useEffect(() => {
    if (isMyPage) {
      // my 페이지 인 경우 - redux에 저장된 정보 가져오기
      setOwner(storedMemberInfo);
    }
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      {/* 유저(내서재) 페이지 상단바 */}
      <CommonTabMenu
        handelTabFocus={handelTabFocus}
        tabMenus={userTabMenus}
        nowTab={nowTab}
      />

      {/* 유저페이지 전체 container 영역(기본) */}
      {/* 상단 메뉴 선택에 따라 바뀌어야 하는 영역 */}

      {/* 유저페이지 소개 선택시 표출 영역 */}
      {owner && nowTab.value === "INTRO" && (
        <Box>
          {/* 소개(intro) 선택시 */}
          <UserIntroProfile memberInfo={owner} memberId={memberId} />

          {/* 유저 서재 도서 미리보기 */}
          {/* 최신순 3개만 보여줌 */}
          <UserPlanList
            memberInfo={owner}
            memberId={memberId}
            isMyPage={isMyPage}
            isPreview={true}
          />

          {/* 유저 독서 기록 미리보기 */}
          {/* 최신순 3개만 보여줌 */}
          <UserPostList
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
        <UserPlanList
          memberInfo={owner}
          memberId={memberId}
          isMyPage={isMyPage}
          isPreview={false}
        />
      )}

      {/* 유저페이지 독서기록 선택시 표출 영역 */}
      {owner && nowTab.value === "POST" && (
        <UserPostList
          memberInfo={owner}
          memberId={memberId}
          isMyPage={isMyPage}
          isPreview={false}
        />
      )}

      {/* 유저페이지 수정 선택시 표출 영역 */}
      {isMyPage && nowTab.value === "SETTING" && <UserSetting />}
    </Box>
  );
};
export default UserPage;
