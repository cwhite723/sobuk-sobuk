import { Box } from "@mui/material";
import { deletePost, postLikePost } from "apis/posts";
import CommonButton from "components/common/CommonButton";
import CommonTypography from "components/common/CommonTypography";
import { useState } from "react";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

interface PropsType {
  myPost: boolean;
  myLike: boolean;
  postId: number;
}

const PostReaction = (props: PropsType) => {
  // redux에 저장된 토큰 가져오기
  const memberToken = useSelector((state: RootState) => state.auth.token);

  // react-query POST like post
  const { mutate: likeMutate } = useMutation(postLikePost, {
    onSuccess: () => {
      console.log("추천 성공");
    },
    onError: (error) => {
      console.log("like error", error);
    },
  });

  // react-query POST like post
  const { mutate: deleteMutate } = useMutation(deletePost, {
    onSuccess: () => {
      console.log("삭제 성공");
    },
    onError: (error) => {
      console.log("delete error", error);
    },
  });

  // 포스트 삭제 버튼 함수
  const handlePostDelete = () => {
    deleteMutate({ postId: props.postId, accessToken: memberToken });
  };

  // 포스트 수정 버튼 함수
  const handlePostEdit = () => {
    console.log("post edit");
  };

  // 포스트 좋아요 버튼 함수
  const handlePostLike = async (postId: number, accessToken: string) => {
    await likeMutate({ postId, accessToken });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        borderBottom: "1px solid",
        mt: 4,
        pb: 1,
      }}
    >
      {/* comment and like */}
      <Box sx={{ display: "flex" }}>
        <CommonTypography value="📄 2" variant="body2" bold={true} />
        <CommonTypography value="✨ 53" variant="body2" bold={true} />
      </Box>

      {/* buttons */}
      <Box sx={{ display: "flex" }}>
        {props.myPost && (
          <Box sx={{ display: "flex" }}>
            <CommonButton
              value="삭제"
              outline={false}
              onClick={handlePostDelete}
            />
            <CommonButton
              value="수정"
              outline={false}
              onClick={handlePostEdit}
            />
          </Box>
        )}
        {memberToken && (
          <CommonButton
            value="추천"
            outline={false}
            onClick={() =>
              memberToken && handlePostLike(props.postId, memberToken)
            }
          />
        )}
      </Box>
    </Box>
  );
};

export default PostReaction;
