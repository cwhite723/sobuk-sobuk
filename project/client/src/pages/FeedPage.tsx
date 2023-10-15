import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import EditIcon from "@mui/icons-material/Edit";
import CommonTypography from "components/common/CommonTypography";
import CommonLink from "components/common/CommonLink";
import CommonBookImage from "components/common/CommonBookImage";
import CommonAvaratImage from "components/common/CommonAvatarImage";
import CommonButton from "components/common/CommonButton";
import React from "react";

const FeedPage = () => {
  const [isFollow, setIsFollow] = React.useState(true);

  const handleUserFollow = () => {
    setIsFollow(!isFollow);
  };
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      {/* 피드 페이지 상단바 */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "3px solid",
          p: 2,
          pb: 0,
        }}
      >
        <Box sx={{ display: "flex" }}>
          <CommonTypography value="📚전체" variant="h6" bold={true} />
          <CommonTypography value="💖팔로잉" variant="h6" bold={false} />
        </Box>
        <Box>
          <CommonLink to="../write">
            <EditIcon />
          </CommonLink>
        </Box>
      </Box>

      {/* 피드 상단(정렬) */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 2,
        }}
      >
        <CommonTypography value="최신순" variant="body2" bold={true} />
        <CommonTypography value="댓글순" variant="body2" bold={false} />
        <CommonTypography value="추천순" variant="body2" bold={false} />
      </Box>

      {/* 피드 컨테이너 영역 */}
      <Grid container spacing={2} columns={{ xs: 1, md: 10 }}>
        {/* 피드 item */}
        <Grid xs="auto" md={5} sx={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "left",
              backgroundColor: "primary.main",
              borderRadius: 5,
              border: "1px solid",
              p: 2,
            }}
          >
            {/* user profile */}
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
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
              <CommonButton
                value="팔로우"
                onClick={handleUserFollow}
                outline={isFollow ? false : true}
              />
            </Box>

            {/* 책 정보 영역 */}
            <Box sx={{ display: "flex" }}>
              <CommonBookImage width={100} height={150} />
              <Box>
                <Box sx={{ display: "flex", alignItems: "baseline", my: 2 }}>
                  <CommonTypography value="책 제목" variant="h6" bold={true} />
                  <CommonTypography value="저자" variant="body2" bold={false} />
                </Box>
                <Box>
                  <CommonTypography value="제목" variant="body2" bold={false} />
                  <CommonTypography
                    value="내용 미리보기"
                    variant="body2"
                    bold={false}
                  />
                </Box>
              </Box>
            </Box>

            {/* 댓글 및 추천수 */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                backgroundColor: "background.default",
                borderRadius: 5,
                py: 1,
              }}
            >
              <CommonTypography value="📄댓글수" variant="body2" bold={true} />
              <CommonTypography value="✨추천수" variant="body2" bold={true} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default FeedPage;
