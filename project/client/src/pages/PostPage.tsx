import { Box } from "@mui/material";
import { getMember } from "apis/members";
import { getPost } from "apis/posts";
import CommonLink from "components/common/CommonLink";
import CommonTitle from "components/common/CommonTitle";
import CommonTypography from "components/common/CommonTypography";
import CommonUserProfile from "components/common/CommonUserProfile";
import PostBookInfo from "components/post/PostBookInfo";
import PostCommentForm from "components/post/PostCommentForm";
import PostCommentItem from "components/post/PostCommentItem";
import PostContents from "components/post/PostContents";
import PostReaction from "components/post/PostReaction";
import { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "store/store";

const PostPage = () => {
  // 현재 url에서 postId 추출
  const { postid } = useParams() as { postid: string };
  // redux에 저장된 토큰 가져오기
  const token = useSelector((state: RootState) => state.auth.token);

  // 현재 포스트 id
  const [nowPostId, setNowPostId] = useState(parseInt(postid));
  // 현재 포스트 정보
  const [post, setPost] = useState<PostInfo>();
  // 현재 포스트 댓글 정보
  const [comments, setComments] = useState<CommentResponse[]>();
  // 현재 포스트 유저 id
  const [memberId, setMemberId] = useState<number | null>(null);
  // 현재 포스트 유저 정보
  const [owner, setOwner] = useState<MemberInfo | OtherMemberInfo>();

  // react-query - get post 현재 포스트 정보 요청
  const { data: postInfo } = useQuery(
    ["getPost", nowPostId, token],
    () => getPost({ postId: nowPostId, accessToken: token }),
    {
      onSuccess(data) {
        if (data) {
          setPost(data.data.postResponse);
          setComments(data.data.commentResponses);
          setMemberId(data.data.postResponse.memberId);
        }
      },
      enabled: !!nowPostId && !!token,
      retry: false,
    },
  );

  // react-query get member
  // 현재 포스트 유저 프로필 get
  const { data: memberInfo } = useQuery(
    ["getMember", memberId, token],
    () => getMember({ memberId: memberId, accessToken: token }),
    {
      onSuccess(data) {
        if (data) {
          setOwner(data.data);
        }
      },
      enabled: !!memberId && !!token,
      retry: false,
    },
  );

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
          value="⬅피드로 돌아가기"
          variant="body2"
          bold={true}
        />
      </CommonLink>

      {post && <CommonTitle value={post.postTitle} />}

      {/* user profile */}
      {owner && post && (
        <CommonUserProfile
          memberInfo={owner}
          memberId={post.memberId}
          avatarSize={50}
        />
      )}

      {/* 책 정보 */}
      {post && (
        <PostBookInfo bookTitle={post.bookTitle} bookAuthor={post.bookAuthor} />
      )}

      {/* 독서 기간 */}
      {post && post.startDate && post.endDate && (
        <PostContents
          title="독서기간"
          contents={post.startDate + " ~ " + post.endDate}
        />
      )}

      {/* 독서기록 내용 */}
      {post && <PostContents title="독서기록 내용" contents={post.content} />}

      {/* 독서기록 reaction and buttons */}
      {/* 아래 컴포넌트 수정 필요 */}
      {post && post.myPost !== undefined && post.myLike !== undefined && (
        <PostReaction
          myPost={post.myPost}
          myLike={post.myLike}
          postId={nowPostId}
        />
      )}

      {/* 댓글 container */}
      {comments && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            "&:nth-of-type(odd)": { backgroundColor: "background.default" },
          }}
        >
          {/* 댓글 item */}
          {comments.map((commnetItem) => (
            <PostCommentItem
              key={commnetItem.commentId}
              commentItem={commnetItem}
            />
          ))}
        </Box>
      )}

      {/* 댓글 입력하기 */}
      {nowPostId && <PostCommentForm postId={nowPostId} />}
    </Box>
  );
};

export default PostPage;
