import { Box } from "@mui/material";
import CommonLink from "components/common/CommonLink";
import CommonTitle from "components/common/CommonTitle";
import CommonTypography from "components/common/CommonTypography";
import CommonUserProfile from "components/common/CommonUserProfile";
import PostBookInfo from "components/post/PostBookInfo";
import PostCommentForm from "components/post/PostCommentForm";
import PostCommentItem from "components/post/PostCommentItem";
import PostContents from "components/post/PostContents";
import PostReaction from "components/post/PostReaction";

const PostPage = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "primary.light",
        boxShadow: "0px 0px 10px rgba(0,0,0,0.3)",
        borderRadius: 5,
        py: { xs: 4, md: 6 },
        px: { xs: 2, md: 4 },
        mt: 4,
      }}
    >
      {/* 피드로 돌아가기 버튼 */}
      <CommonLink to="../feed">
        <CommonTypography
          value="⬅피드로 돌아가기"
          variant="body2"
          bold={true}
        />
      </CommonLink>

      <CommonTitle value="독서기록 제목" />

      {/* user profile */}
      <CommonUserProfile userId="userId" userName="userName" avatarSize={50} />

      {/* 책 정보 */}
      <PostBookInfo />

      {/* 독서 기간 */}
      <PostContents title="독서기간" contents="2023.03.05~2023.08.10" />

      {/* 독서기록 내용 */}
      <PostContents
        title="독서기록 내용"
        contents="내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용"
      />

      {/* 독서기록 reaction and buttons */}
      <PostReaction />

      {/* 댓글 container */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          "&:nth-of-type(odd)": { backgroundColor: "background.default" },
        }}
      >
        {/* 댓글 item */}
        <PostCommentItem />
        <PostCommentItem />
        <PostCommentItem />
        <PostCommentItem />
      </Box>

      {/* 댓글 입력하기 */}
      <PostCommentForm />
    </Box>
  );
};

export default PostPage;
