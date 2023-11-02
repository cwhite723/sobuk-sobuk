import { Box } from "@mui/material";
import CommonTabMenu from "components/common/CommonTabMenu";
import UserBookList from "components/user/UserBookList";
import UserIntroProfile from "components/user/UserIntroProfile";
import UserPostList from "components/user/UserPostList";
import UserSetting from "components/user/UserSetting";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

// 내 서재 서브 탭 메뉴 데이터
const userTabMenus = [
  { label: "⛄소개", value: "intro" },
  { label: "📚서재", value: "lib" },
  { label: "📓독서기록", value: "post" },
  { label: "🔐계정정보/탈퇴", value: "setting" },
];

// 더미 데이터
const userLibrary: BookItem[] = [
  {
    bookId: 1,
    bookName: "제목1",
    bookWriter: "작가1",
    bookPublish: "출판사1",
    bookPages: 365,
    bookState: "reading",
    bookProgress: 278,
    bookDate: [new Date("2023-10-25"), new Date("2023-11-25")],
  },
  {
    bookId: 2,
    bookName: "제목2",
    bookWriter: "작가2",
    bookPublish: "출판사2",
    bookPages: 563,
    bookState: "after",
    bookProgress: 550,
  },
  {
    bookId: 3,
    bookName: "제목3",
    bookWriter: "작가3",
    bookPublish: "출판사3",
    bookPages: 156,
    bookState: "before",
    bookProgress: 0,
  },
  {
    bookId: 4,
    bookName: "제목4",
    bookWriter: "작가4",
    bookPublish: "출판사4",
    bookPages: 298,
    bookState: "complete",
    bookProgress: 298,
  },
];

const userPostList: PostItem[] = [
  {
    postId: 1,
    postBookInfo: userLibrary[0],
    postTitle: "독서기록 제목1",
    postOwner: "test2",
    postContents: "독서기록 내용입니다1",
    postCommentsCount: 5,
    postLikeCount: 10,
  },
  {
    postId: 2,
    postBookInfo: userLibrary[1],
    postTitle: "독서기록 제목2",
    postOwner: "test2",
    postContents: "독서기록 내용입니다2",
    postCommentsCount: 5,
    postLikeCount: 10,
  },
  {
    postId: 3,
    postBookInfo: userLibrary[2],
    postTitle: "독서기록 제목3",
    postOwner: "test2",
    postContents: "독서기록 내용입니다3",
    postCommentsCount: 5,
    postLikeCount: 10,
  },
  {
    postId: 4,
    postBookInfo: userLibrary[3],
    postTitle: "독서기록 제목4",
    postOwner: "test2",
    postContents: "독서기록 내용입니다4",
    postCommentsCount: 5,
    postLikeCount: 10,
  },
  {
    postId: 5,
    postBookInfo: userLibrary[0],
    postTitle: "독서기록 제목5",
    postOwner: "test2",
    postContents: "독서기록 내용입니다5",
    postCommentsCount: 5,
    postLikeCount: 10,
  },
];

const UserPage = () => {
  // store 값 가져오기(해당 UserPage의 주인 정보가 필요한데 임시로 스토어값을 씀)
  const storedUserInfo = useSelector((state: RootState) => state.user.value);

  // 현재 선택된 탭 메뉴
  const [nowTab, setNowTab] = useState(userTabMenus[0]);

  // 선택된 탭 메뉴를 변경하는 함수
  const handelTabFocus = (newSelectMenu: TabMenuType) => {
    setNowTab(newSelectMenu);
  };

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
      {nowTab.value === "intro" && (
        <Box>
          {/* 소개(intro) 선택시 */}
          <UserIntroProfile />

          {/* 유저 서재 도서 미리보기 */}
          {/* 최신순 3개만 보여줌 */}
          <UserBookList
            userName={storedUserInfo.userName}
            userBookList={userLibrary}
            isPreview={true}
          />

          {/* 유저 독서 기록 미리보기 */}
          {/* 최신순 3개만 보여줌 */}
          <UserPostList
            userName={storedUserInfo.userName}
            userPostList={userPostList}
            isPreview={true}
          />
        </Box>
      )}

      {/* 유저페이지 서재 선택시 표출 영역 */}
      {/* 전체도서 표출 */}
      {nowTab.value === "lib" && (
        <UserBookList
          userName={storedUserInfo.userName}
          userBookList={userLibrary}
          isPreview={false}
        />
      )}

      {/* 유저페이지 독서기록 선택시 표출 영역 */}
      {nowTab.value === "post" && (
        <UserPostList
          userName={storedUserInfo.userName}
          userPostList={userPostList}
        />
      )}

      {/* 유저페이지 수정 선택시 표출 영역 */}
      {nowTab.value === "setting" && <UserSetting />}
    </Box>
  );
};
export default UserPage;
