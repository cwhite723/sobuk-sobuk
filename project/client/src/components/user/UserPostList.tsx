import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { getMemberPosts, getMyPosts } from "apis/members";
import CommonBookImage from "components/common/CommonBookImage";
import CommonTitle from "components/common/CommonTitle";
import CommonTypography from "components/common/CommonTypography";
import { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

interface PropsType {
  memberInfo: MemberInfo | OtherMemberInfo;
  memberId: number | null;
  isMyPage: boolean;
  isPreview: boolean;
}

const UserPostList = (props: PropsType) => {
  const memberToken = useSelector((state: RootState) => state.auth.token);

  // 데이터 요청에 필요한 params
  const [params, setParams] = useState<MemberPostsAndBooksParams>({
    id: null,
    size: 10,
  });

  const [memberPosts, setMemberPosts] = useState<MemberPostsInfo[]>();

  // react-query - GET my posts
  const { data: myPostsData } = useQuery(
    ["getMyPosts", params, memberToken],
    () => getMyPosts({ params, accessToken: memberToken }),
    {
      onSuccess: (data) => {
        // 성공했을 때
        if (data) {
          setMemberPosts(data.data.data);
        }
      },
      onError: (error) => {
        console.log(error);
      },
      enabled: !!params && !!props.isMyPage,
    },
  );

  // react-query - GET member posts
  const { data: memberPostsData } = useQuery(
    ["getMemberPosts", params, memberToken, props.memberId],
    () =>
      getMemberPosts({
        params,
        accessToken: memberToken,
        memberId: props.memberId ? props.memberId : 0,
      }),
    {
      onSuccess: (data) => {
        // 성공했을 때
        if (data) {
          setMemberPosts(data.data.data);
        }
      },
      onError: (error) => {
        console.log(error);
      },
      enabled: !!params && !!props.memberId,
    },
  );

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
          value={
            "📓 " +
              props.memberInfo.nickname +
              "님의 독서기록은 총 " +
              props.memberInfo.countPost ===
            null
              ? "0"
              : props.memberInfo.countPost + "개가 있어요"
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
            .filter((postItem, index) =>
              props.isPreview ? index < 3 : postItem,
            )
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
                  {/* 이미지 수정 필요 */}
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
                      ml: 2,
                    }}
                  >
                    <CommonTypography
                      value={postItem.bookTitle}
                      variant="h6"
                      bold={true}
                    />
                    <CommonTypography
                      value={postItem.title}
                      variant="body2"
                      bold={false}
                    />
                    <Box sx={{ display: "flex", mt: 2 }}>
                      <CommonTypography
                        value={"📄" + postItem.countComment.toString()}
                        variant="body2"
                        bold={true}
                      />
                      <CommonTypography
                        value={"✨" + postItem.countLike.toString()}
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
