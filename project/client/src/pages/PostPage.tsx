import { Box } from "@mui/material";
import CommonBookImage from "components/common/CommonBookImage";
import CommonLink from "components/common/CommonLink";
import CommonTitle from "components/common/CommonTitle";
import CommonTypography from "components/common/CommonTypography";
import CommonUserProfile from "components/common/CommonUserProfile";
import PostBookInfo from "components/post/PostBookInfo";
import PostCommentForm from "components/post/PostCommentForm";
import PostCommentItem from "components/post/PostCommentItem";
import PostContents from "components/post/PostContents";
import PostReaction from "components/post/PostReaction";
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
      <CommonLink to="../feed">
        <CommonTypography
          text="⬅피드로 돌아가기"
          variant="body2"
          bold={true}
        />
      </CommonLink>

      {/* 사용자 정보 */}
      {postInfo && (
        <Box sx={{ py: 2 }}>
          <CommonUserProfile
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
            <CommonTitle text={"📢 " + postInfo.data.postResponse.postTitle} />
          </Box>

          {/* 책 정보 */}
          <PostBookInfo
            bookTitle={postInfo.data.postResponse.bookTitle}
            bookAuthor={postInfo.data.postResponse.bookAuthor}
          />

          {/* 독서 기간 */}
          <PostContents
            title="독서기간"
            contents={
              postInfo.data.postResponse.startDate +
              " ~ " +
              postInfo.data.postResponse.endDate
            }
          />

          {/* 독서기록 */}
          <PostContents
            title="독서기록 내용"
            contents={postInfo.data.postResponse.content}
          />
          <CommonBookImage
            width={100}
            src={postInfo.data.postResponse.imageUrl}
          />

          {/* 독서기록 reaction and buttons */}
          {postInfo.data.postResponse.myPost !== undefined &&
            postInfo.data.postResponse.myLike !== undefined && (
              <PostReaction
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
            <PostCommentItem
              key={commnetItem.commentId}
              commentItem={commnetItem}
            />
          ))}
        </Box>
      )}

      {/* 댓글 입력 폼 */}
      {postId && <PostCommentForm postId={postId} />}
    </Box>
  );
};

export default PostPage;
