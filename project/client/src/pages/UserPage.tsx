import { Box } from "@mui/material";
import { getMember } from "apis/members";
import CommonTabMenu from "components/common/CommonTabMenu";
import UserBookList from "components/user/UserBookList";
import UserIntroProfile from "components/user/UserIntroProfile";
import UserPostList from "components/user/UserPostList";
import UserSetting from "components/user/UserSetting";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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
    bookDate: [new Date("2023-10-25"), new Date("2023-11-25")],
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

// 피드 주인
const feedOwners: MemberInfo[] = [
  {
    userName: "test2",
    nickname: "test2",
    password: "",
    email: "email",
    introduction: "hi",
  },
  {
    userName: "test4",
    nickname: "test4",
    password: "",
    email: "email",
    introduction: "hi",
  },
];

const allPost: PostItem[] = [
  {
    postId: 1,
    postBookInfo: userLibrary[3],
    postTitle: "제목입니다.",
    postOwner: feedOwners[0],
    postContents: "내용입니다.",
    postCommentsCount: 3,
    postLikeCount: 10,
  },
  {
    postId: 2,
    postBookInfo: userLibrary[3],
    postTitle: "제목입니다.",
    postOwner: feedOwners[1],
    postContents: "내용입니다.",
    postCommentsCount: 3,
    postLikeCount: 10,
  },
  {
    postId: 3,
    postBookInfo: userLibrary[3],
    postTitle: "제목입니다.",
    postOwner: feedOwners[0],
    postContents: "내용입니다.",
    postCommentsCount: 3,
    postLikeCount: 10,
  },
  {
    postId: 4,
    postBookInfo: userLibrary[3],
    postTitle: "제목입니다.",
    postOwner: feedOwners[1],
    postContents: "내용입니다.",
    postCommentsCount: 3,
    postLikeCount: 10,
  },
];

const UserPage = () => {
  // 해당 UserPage의 주인 정보 가져오기
  const { memberId } = useParams() as { memberId: string };

  // 해당 UserPage의 주인 정보가 담긴 state
  const [memberInfo, setMemberInfo] = useState<MemberInfo>({
    memberId: 0,
    userName: "",
    password: "",
    nickname: "",
    email: "",
    introduction: "",
  });

  // 현재 선택된 탭 메뉴
  const [nowTab, setNowTab] = useState(userTabMenus[0]);

  // 선택된 탭 메뉴를 변경하는 함수
  const handelTabFocus = (newSelectMenu: TabMenuType) => {
    setNowTab(newSelectMenu);
  };

  useEffect(() => {
    // 현재 로그인한 유저의 정보 가져오기
    const storedMemberInfo = useSelector(
      (state: RootState) => state.auth.member,
    );

    if (storedMemberInfo.memberId === parseInt(memberId)) {
      // 자기 자신의 페이지에 접속했을때
      setMemberInfo(storedMemberInfo);
    } else {
      // 다른 유저의 페이지로 접속했을 경우 get해온 데이터 사용
      const { isError } = useQuery(
        "getMemberInfo",
        () => getMember(parseInt(memberId)),
        {
          onError: (error) => {
            console.log("isError:" + isError, error);
          },
          onSuccess: (data) => {
            // 성공했을 때
            setMemberInfo(data);
          },
        },
      );
    }

    // memberinfo 정보에 따라 postlist, booklist 가져오기
    // 여기서 받아서 props로 넘겨주는게 나은지?
    // 하위 컴포넌트에서 요청을 하는게 나은지?
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
      {nowTab.value === "intro" && (
        <Box>
          {/* 소개(intro) 선택시 */}
          <UserIntroProfile memberInfo={memberInfo} />

          {/* 유저 서재 도서 미리보기 */}
          {/* 최신순 3개만 보여줌 */}
          <UserBookList
            nickname={memberInfo.nickname}
            userBookList={userLibrary}
            isPreview={true}
          />

          {/* 유저 독서 기록 미리보기 */}
          {/* 최신순 3개만 보여줌 */}
          <UserPostList
            nickname={memberInfo.nickname}
            userPostList={allPost}
            isPreview={true}
          />
        </Box>
      )}

      {/* 유저페이지 서재 선택시 표출 영역 */}
      {/* 전체도서 표출 */}
      {nowTab.value === "lib" && (
        <UserBookList
          nickname={memberInfo.nickname}
          userBookList={userLibrary}
          isPreview={false}
        />
      )}

      {/* 유저페이지 독서기록 선택시 표출 영역 */}
      {nowTab.value === "post" && (
        <UserPostList nickname={memberInfo.nickname} userPostList={allPost} />
      )}

      {/* 유저페이지 수정 선택시 표출 영역 */}
      {nowTab.value === "setting" && <UserSetting />}
    </Box>
  );
};
export default UserPage;
