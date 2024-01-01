import { Box } from "@mui/material";
import BookImage from "components/atoms/BookImage";
import CustomLink from "components/atoms/CustomLink";
import CustomTypography from "components/atoms/CustomTypography";
import UserProfile from "components/blocks/UserProfile";
import BookInfo from "components/blocks/post/BookInfo";
import CommentForm from "components/blocks/post/CommentForm";
import CommentItem from "components/blocks/post/CommentItem";
import Contents from "components/blocks/post/Contents";
import Reactions from "components/blocks/post/Reactions";
import usePostQuery from "hooks/queries/posts/usePostQuery";
import { useParams } from "react-router-dom";
import { getStoredMember, getStoredToken } from "utils/get";

const PostPage = () => {
  // 현재 url에서 postId 추출
  const { postid } = useParams() as { postid: string };
  const postId = parseInt(postid, 10);

  // redux에 저장된 토큰 가져오기
  const memberToken = getStoredToken();
  const memberInfo = getStoredMember();

  // react-query - get post 현재 포스트 정보 요청
  const { data: postInfo } = usePostQuery(postId, memberToken, {
    enabled: !!postId && !!memberToken,
  });

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "primary.light",
        boxShadow: "0px 0px 5px rgba(0,0,0,0.5)",
        borderRadius: 5,
        py: { xs: 4, md: 6 },
        px: { xs: 4, md: 6 },
        mt: 4,
        gap: 2,
      }}
    >
      {/* 피드로 돌아가기 버튼 */}
      <CustomLink to="../feed">
        <CustomTypography
          text="⬅피드로 돌아가기"
          variant="body2"
          bold={true}
        />
      </CustomLink>

      {/* 사용자 정보 */}
      {postInfo && (
        <Box sx={{ py: 2 }}>
          <UserProfile
            memberId={
              memberInfo?.userName === postInfo?.data.postResponse.userName
                ? null
                : postInfo?.data.postResponse.memberId
            }
            avatarSize={50}
          />
        </Box>
      )}

      {postInfo && (
        <Box sx={{ py: 2, borderTop: "1px solid", borderBottom: "1px solid" }}>
          <Box
            sx={{
              display: "flex",
              my: 2,
            }}
          >
            <CustomTypography
              text={"📢 " + postInfo.data.postResponse.postTitle}
              variant="h5"
              bold={true}
            />
          </Box>

          {/* 책 정보 */}
          <BookInfo
            bookTitle={postInfo.data.postResponse.bookTitle}
            bookAuthor={postInfo.data.postResponse.bookAuthor}
          />

          {/* 독서 기간 */}
          <Contents
            title="독서기간"
            contents={
              postInfo.data.postResponse.startDate +
              " ~ " +
              postInfo.data.postResponse.endDate
            }
          />

          {/* 독서기록 */}
          <Contents
            title="독서기록 내용"
            contents={postInfo.data.postResponse.content}
          />
          <BookImage width={100} src={postInfo.data.postResponse.imageUrl} />

          {/* 독서기록 reaction and buttons */}
          {postInfo.data.postResponse.myPost !== undefined &&
            postInfo.data.postResponse.myLike !== undefined && (
              <Reactions
                countComments={postInfo.data.postResponse.countComments}
                countLikes={postInfo.data.postResponse.countLikes}
                myPost={postInfo.data.postResponse.myPost}
                myLike={postInfo.data.postResponse.myLike}
                postId={postId}
              />
            )}
        </Box>
      )}

      {/* 댓글 container */}
      {postInfo && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "background.default",
          }}
        >
          {/* 댓글 item */}
          {postInfo.data.commentResponses.map((commnetItem) => (
            <CommentItem
              key={commnetItem.commentId}
              commentItem={commnetItem}
            />
          ))}
        </Box>
      )}

      {/* 댓글 입력 폼 */}
      {postId && <CommentForm postId={postId} />}
    </Box>
  );
};

export default PostPage;
