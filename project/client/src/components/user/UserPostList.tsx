import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import CommonBookImage from "components/common/CommonBookImage";
import CommonTitle from "components/common/CommonTitle";
import CommonTypography from "components/common/CommonTypography";

interface PropsType {
  nickname: string;
  userPostList: PostItem[];
  isPreview?: boolean;
}

const UserPostList: React.FC<PropsType> = (props) => {
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
            props.nickname +
            "님의 독서기록은 총 " +
            props.userPostList.length +
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
        {props.userPostList
          .filter((postItem, index) => (props.isPreview ? index < 3 : postItem))
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
                  src={postItem.postBookInfo.bookImg}
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
                    value={postItem.postBookInfo.bookName}
                    variant="h6"
                    bold={true}
                  />
                  <CommonTypography
                    value={postItem.postTitle}
                    variant="body2"
                    bold={false}
                  />
                  <Box sx={{ display: "flex", mt: 2 }}>
                    <CommonTypography
                      value={"📄" + postItem.postCommentsCount.toString()}
                      variant="body2"
                      bold={true}
                    />
                    <CommonTypography
                      value={"✨" + postItem.postLikeCount.toString()}
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
