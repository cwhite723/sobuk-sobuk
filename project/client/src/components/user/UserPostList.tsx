import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import CommonBookImage from "components/common/CommonBookImage";
import CommonTitle from "components/common/CommonTitle";
import CommonTypography from "components/common/CommonTypography";
import useMemberPostsQuery from "hooks/queries/members/useMemberPostsQuery";
import useMyPostsQuery from "hooks/queries/members/useMyPostsQuery";
import { useEffect, useState } from "react";
import { getStoredToken } from "utils/get";

interface PropsType {
  memberInfo: MemberInfo | OtherMemberInfo;
  memberId: number | null;
  isMyPage: boolean;
  isPreview: boolean;
}

const UserPostList = ({
  memberInfo,
  memberId,
  isMyPage,
  isPreview,
}: PropsType) => {
  const memberToken = getStoredToken();

  // 데이터 요청에 필요한 params
  // 무한 스크롤 구현 필요
  const [params, setParams] = useState<MemberPostsAndBooksParams>({
    id: null,
    size: 10,
  });

  // 받아온 데이터
  const [memberPosts, setMemberPosts] = useState<MemberPostsInfo[] | null>(
    null,
  );

  // react-query - GET my posts
  const { data: myPostsData, isSuccess: isMyPostsSuccess } = useMyPostsQuery(
    params,
    memberToken,
    {
      enabled: !!memberToken && !!params && isMyPage,
    },
  );

  // react-query - GET member posts
  const { data: memberPostsData, isSuccess: isMemberPostsSuccess } =
    useMemberPostsQuery(params, memberToken, memberId, {
      enabled: !!memberToken && !!params && !!memberId,
    });

  useEffect(() => {
    if (isMyPage && isMyPostsSuccess) {
      setMemberPosts(myPostsData.data.data);
    }
    if (memberId && isMemberPostsSuccess) {
      setMemberPosts(memberPostsData.data.data);
    }
  }, [isMyPostsSuccess, isMemberPostsSuccess]);

  return (
    <Box>
      {/* title */}
      <Box
        sx={{
          display: "flex",
          pt: 4,
          mt: 2,
        }}
      >
        <CommonTitle
          text={
            "📓 " +
            memberInfo.nickname +
            "님의 독서기록은 총 " +
            memberInfo.countPost +
            "개가 있어요"
          }
        />
      </Box>

      {/* 유저 독서기록 영역 */}
      <Grid
        container
        columns={{ xs: 1, md: 3 }}
        sx={{
          width: "100%",
          backgroundColor: "primary.main",
          borderRadius: 5,
          boxShadow: "0px 0px 5px rgba(0,0,0,0.5)",
        }}
      >
        {/* 유저 독서기록 item */}
        {memberPosts &&
          memberPosts
            .filter((postItem, index) => (isPreview ? index < 3 : postItem))
            .map((postItem) => (
              <Grid xs={1} md={1} key={postItem.postId}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "background.default",
                    borderRadius: 5,
                    boxShadow: "0px 0px 5px rgba(0,0,0,0.3)",
                    p: 2,
                    m: 4,
                  }}
                >
                  <CommonBookImage
                    width={100}
                    height={150}
                    src={postItem.imageUrl}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <CommonTypography
                      text={postItem.bookTitle}
                      variant="body1"
                      bold={true}
                    />
                    <CommonTypography
                      text={postItem.title}
                      variant="h6"
                      bold={true}
                    />
                    <Box sx={{ display: "flex", mt: 2 }}>
                      <CommonTypography
                        text={"📄" + postItem.countComment.toString()}
                        variant="body2"
                        bold={true}
                      />
                      <CommonTypography
                        text={"✨" + postItem.countLike.toString()}
                        variant="body2"
                        bold={true}
                      />
                    </Box>
                  </Box>
                </Box>
              </Grid>
            ))}
      </Grid>
    </Box>
  );
};

export default UserPostList;
