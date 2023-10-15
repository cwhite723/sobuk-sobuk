import { Box } from "@mui/material";
import CommonButton from "components/common/CommonButton";
import CommonTypography from "components/common/CommonTypography";
import React from "react";

const PostReaction = () => {
  const [isOwner, setIsOwner] = React.useState(true);

  const handlePostDelete = () => {
    console.log("post delete");
  };

  const handlePostEdit = () => {
    console.log("post edit");
  };

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
      }}
    >
      {/* comment and like */}
      <Box sx={{ display: "flex" }}>
        <CommonTypography value="📄 2" variant="body2" bold={true} />
        <CommonTypography value="✨ 53" variant="body2" bold={true} />
      </Box>

      {/* buttons */}
      <Box sx={{ display: "flex" }}>
        {isOwner && (
          <Box>
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
