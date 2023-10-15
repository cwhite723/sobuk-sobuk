import { Box } from "@mui/material";
import CommonAvaratImage from "components/common/CommonAvatarImage";
import CommonBigButton from "components/common/CommonBigButton";
import CommonBookImage from "components/common/CommonBookImage";
import CommonButton from "components/common/CommonButton";
import CommonLink from "components/common/CommonLink";
import CommonTextField from "components/common/CommonTextField";
import CommonTitle from "components/common/CommonTitle";
import CommonTypography from "components/common/CommonTypography";
import React from "react";

const PostPage = () => {
  const [isFollow, setIsFollow] = React.useState(true);
  const [isOwner, setIsOwner] = React.useState(true);

  const handleUserFollow = () => {
    setIsFollow(!isFollow);
  };

  const handlePostDelete = () => {
    console.log("post delete");
  };

  const handlePostEdit = () => {
    console.log("post edit");
  };

  const handlePostLike = () => {
    console.log("post like");
  };

  const handleSubmitComment = () => {
    console.log("SubmitComment");
  };
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
      <CommonTitle value="독서기록 제목" />

      {/* user profile */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <CommonLink to="../user/1">
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CommonAvaratImage size={50} />
            <Box sx={{ m: 1 }}>
              <CommonTypography
                value="작성자 닉네임"
                variant="body1"
                bold={true}
              />
              <CommonTypography
                value="작성자 아이디"
                variant="body2"
                bold={false}
              />
            </Box>
          </Box>
        </CommonLink>
        <CommonButton
          value="팔로우"
          onClick={handleUserFollow}
          outline={isFollow ? false : true}
        />
      </Box>

      {/* 책 정보 */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          backgroundColor: "primary.main",
          borderRadius: 5,
          border: "1px solid",
          p: 2,
          my: 2,
        }}
      >
        <CommonBookImage width={150} height={180} />
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
              alignItems: "baseline",
              borderBottom: "1px solid",
              mt: 2,
              mr: 2,
            }}
          >
            <CommonTypography value="책 제목" variant="h6" bold={true} />
            <CommonTypography value="작가" variant="body1" bold={true} />
          </Box>
          <Box sx={{ my: 1 }}>
            <CommonTypography
              value="책 줄거리 한줄 소개"
              variant="body1"
              bold={false}
            />
          </Box>
        </Box>
      </Box>

      {/* 독서 기간 */}
      <Box sx={{ mt: 2 }}>
        <CommonTitle value="독서기간" />
        <CommonTypography
          value="2023.03.05~2023.08.10"
          variant="body1"
          bold={false}
        />
      </Box>

      {/* 독서기록 내용 */}
      <Box sx={{ mt: 2 }}>
        <CommonTitle value="독서기록 내용" />
        <CommonTypography
          value="내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용"
          variant="body1"
          bold={false}
        />
      </Box>

      {/* 독서기록 reaction and buttons */}
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

      {/* 댓글 container */}
      <Box>
        {/* 댓글 item */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "baseline", md: "center" },
            backgroundColor: "background.default",
            borderBottom: "1px solid",
            p: 1,
          }}
        >
          {/* 작성자 profile */}
          <Box
            sx={{ display: "flex", alignItems: "center", mb: { xs: 1, md: 0 } }}
          >
            <CommonAvaratImage size={35} />
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "row", md: "column" },
                ml: 1,
                flexShrink: 0,
              }}
            >
              <CommonTypography value="닉네임" variant="body2" bold={true} />
              <CommonTypography value="아이디" variant="body2" bold={false} />
            </Box>
          </Box>

          {/* 댓글 내용 */}
          <Box sx={{ ml: 1, p: 1 }}>
            <CommonTypography
              value="댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용"
              variant="body1"
              bold={true}
            />
          </Box>
        </Box>

        {/* 댓글 입력하기 */}
        <Box
          sx={{
            width: "100%",
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CommonTextField
            id="comment"
            label="comment"
            placeholder="댓글 내용을 입력하세요"
            type="required"
          />
          <CommonBigButton value="입력" onClick={handleSubmitComment} />
        </Box>
      </Box>
    </Box>
  );
};

export default PostPage;
