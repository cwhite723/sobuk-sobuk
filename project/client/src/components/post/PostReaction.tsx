import { Box } from "@mui/material";
import CommonButton from "components/common/CommonButton";
import CommonTypography from "components/common/CommonTypography";
import usePostDeleteMutation from "hooks/mutates/posts/usePostDeleteMutation";
import usePostLikeMutation from "hooks/mutates/posts/usePostLikeMutation";
import { useNavigate } from "react-router-dom";
import { getStoredToken } from "utils/get";

interface PropsType {
  countComments: number;
  countLikes: number;
  myPost: boolean;
  myLike: boolean;
  postId: number;
}

const PostReaction = ({
  countComments,
  countLikes,
  myPost,
  myLike,
  postId,
}: PropsType) => {
  const navigate = useNavigate();
  // redux에 저장된 토큰 가져오기
  const memberToken = getStoredToken();

  // react-query POST like post
  const { mutate: likeMutate } = usePostLikeMutation();

  // react-query DELETE post
  const { mutate: deleteMutate } = usePostDeleteMutation();

  // 포스트 삭제 버튼 함수
  const handlePostDelete = () => {
    deleteMutate({ postId, accessToken: memberToken });
  };

  // 포스트 수정 버튼 함수
  const handlePostEdit = () => {
    navigate("../edit/" + postId);
  };

  // 포스트 좋아요 버튼 함수
  const handlePostLike = () => {
    likeMutate({ postId, accessToken: memberToken });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        mt: 4,
      }}
    >
      {/* comment and like */}
      <Box sx={{ display: "flex" }}>
        <CommonTypography
          text={"📄 " + countComments}
          variant="body2"
          bold={true}
        />
        <CommonTypography
          text={"✨ " + countLikes}
          variant="body2"
          bold={true}
        />
      </Box>

      {/* buttons */}
      <Box sx={{ display: "flex" }}>
        {myPost && (
          <Box sx={{ display: "flex" }}>
            <CommonButton
              buttonText="삭제"
              outline={false}
              handleClickEvent={handlePostDelete}
            />
            <CommonButton
              buttonText="수정"
              outline={false}
              handleClickEvent={handlePostEdit}
            />
          </Box>
        )}
        {memberToken && !myPost && (
          <CommonButton
            buttonText={myLike ? "💖완료" : "🤍좋아요"}
            outline={false}
            handleClickEvent={handlePostLike}
          />
        )}
      </Box>
    </Box>
  );
};

export default PostReaction;
