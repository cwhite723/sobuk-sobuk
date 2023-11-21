import { Box } from "@mui/material";
import CommonButton from "components/common/CommonButton";
import CommonTypography from "components/common/CommonTypography";
import { useState } from "react";

interface PropsType {
  myPost: boolean;
  myLike: boolean;
}

const PostReaction = (props: PropsType) => {
  // 포스트 삭제 버튼 함수
  const handlePostDelete = () => {
    console.log("post delete");
  };

  // 포스트 수정 버튼 함수
  const handlePostEdit = () => {
    console.log("post edit");
  };

  // 포스트 좋아요 버튼 함수
  const handlePostLike = () => {
    console.log("post like");
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
        <CommonButton value="추천" outline={false} onClick={handlePostLike} />
      </Box>
    </Box>
  );
};

export default PostReaction;
