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
import useMemberInfoQuery from "hooks/queries/members/useMemberInfoQuery";
import usePostQuery from "hooks/queries/posts/usePostQuery";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStoredToken } from "utils/get";

const PostPage = () => {
  // 현재 url에서 postId 추출
  const { postid } = useParams() as { postid: string };
  const postId = parseInt(postid, 10);

  // redux에 저장된 토큰 가져오기
  const memberToken = getStoredToken();

  // 현재 포스트 유저 id
  const [memberId, setMemberId] = useState<number | null>(null);

  // react-query - get post 현재 포스트 정보 요청
  const { data: postInfo, isSuccess: isPostInfoSuccess } = usePostQuery(
    postId,
    memberToken,
    {
      enabled: !!postId && !!memberToken,
    },
  );

  // react-query get member
  // 현재 포스트 유저 프로필 get
  const { data: memberInfo } = useMemberInfoQuery(memberId, memberToken, {
    enabled: !!memberId && !!memberToken,
  });

  useEffect(() => {
    if (postInfo && isPostInfoSuccess) {
      setMemberId(postInfo.data.postResponse.memberId);
    }
  }, [isPostInfoSuccess]);

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
      {memberInfo && postInfo && (
        <CommonUserProfile
          memberInfo={memberInfo.data}
          memberId={postInfo.data.postResponse.memberId}
          avatarSize={50}
        />
      )}

      {postInfo && (
        <Box>
          <CommonTitle text={postInfo.data.postResponse.postTitle} />

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

          {/* 독서기록 내용 */}
          <CommonBookImage
            width={100}
            height={150}
            src={postInfo.data.postResponse.imageUrl}
          />
          <PostContents
            title="독서기록 내용"
            contents={postInfo.data.postResponse.content}
          />

          {/* 독서기록 reaction and buttons */}
          {postInfo.data.postResponse.myPost &&
            postInfo.data.postResponse.myLike && (
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
            "&:nth-of-type(odd)": { backgroundColor: "background.default" },
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
