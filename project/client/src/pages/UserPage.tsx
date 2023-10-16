import { Box, Input } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import CommonAvaratImage from "components/common/CommonAvatarImage";
import CommonBigButton from "components/common/CommonBigButton";
import CommonBookImage from "components/common/CommonBookImage";
import CommonButton from "components/common/CommonButton";
import CommonLink from "components/common/CommonLink";
import CommonTextField from "components/common/CommonTextField";
import CommonTitle from "components/common/CommonTitle";
import CommonTypography from "components/common/CommonTypography";
import React from "react";

type TabMenu = "intro" | "lib" | "post" | "setting";

const UserPage = () => {
  // 계정정보 수정
  const [profileImg, setProfileImg] = React.useState<string>("");

  const handleChangeImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setProfileImg(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleSetting = () => {
    console.log("계정 정보 수정 완료");
  };

  const [selectTab, setSelectTab] = React.useState<TabMenu>("intro");
  const [isOwner, setIsOwner] = React.useState<boolean>(true);
  const [userName, setUserName] = React.useState("윤정");
  const [userBookList, setUserBookList] = React.useState(4);
  const [userPostList, setUserPostList] = React.useState(2);

  const [isFollow, setIsFollow] = React.useState(true);

  const handleUserFollow = () => {
    setIsFollow(!isFollow);
  };
  return (
    <Box sx={{ width: "100%" }}>
      {/* 유저(내서재) 페이지 상단바 */}
      {/* MUI Tab Menu 적용하기 */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "3px solid",
          p: 2,
          pb: 1,
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex" }}>
          <CommonTypography value="⛄소개" variant="h6" bold={true} />
          <CommonTypography value="📚서재" variant="h6" bold={false} />
          <CommonTypography value="📓독서기록" variant="h6" bold={false} />
        </Box>
        {isOwner && (
          <Box sx={{ display: "flex" }}>
            <CommonTypography value="수정" variant="h6" bold={false} />
            <CommonLink to="#">
              <CommonTypography value="탈퇴" variant="h6" bold={false} />
            </CommonLink>
          </Box>
        )}
      </Box>

      {/* 유저페이지 전체 container 영역(기본) */}
      {/* 상단 메뉴 선택에 따라 바뀌어야 하는 영역 */}
      {selectTab === "intro" && (
        <Box>
          {/* 소개(intro) 선택시 */}
          {/* // 유저 프로필 section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "primary.main",
              borderRadius: 5,
              border: "1px solid",
              p: 2,
            }}
          >
            {/* 유저 정보 및 팔로우 버튼 */}
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {/* 유저 정보 */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <CommonAvaratImage size={100} />
                <Box sx={{ m: 1 }}>
                  <CommonTypography value="윤정" variant="h6" bold={true} />
                  <CommonTypography
                    value="팔로잉 0 팔로워 0"
                    variant="body2"
                    bold={false}
                  />
                </Box>
              </Box>

              {/* 팔로우 버튼 */}
              {isOwner ? (
                ""
              ) : (
                <CommonButton
                  value="팔로우"
                  onClick={handleUserFollow}
                  outline={isFollow ? false : true}
                />
              )}
            </Box>

            {/* 자기소개 영역 */}
            <Box
              sx={{
                mt: 2,
                backgroundColor: "background.default",
                borderRadius: 5,
                p: 2,
              }}
            >
              <CommonTypography
                value="소개글이 없습니다😥"
                variant="body1"
                bold={true}
              />
            </Box>
          </Box>

          {/* 유저 서재 도서 미리보기 */}
          {/* 유저 서재 도서 title */}
          <Box
            sx={{
              display: "flex",
              borderBottom: "3px solid",
              pt: 2,
              my: 2,
            }}
          >
            <CommonTitle
              value={
                "📚 " +
                userName +
                "님의 서재에 총 " +
                userBookList +
                "권의 책이 있어요"
              }
            />
          </Box>
          {/*  유저 서재 도서 영역 */}
          {/* 최신순 4개만 보여줌 */}
          <Grid
            container
            columns={{ xs: 1, md: 4 }}
            sx={{
              width: "100%",
              backgroundColor: "primary.main",
              borderRadius: 5,
              border: "1px solid",
            }}
          >
            {/* 유저 서재 도서 item */}
            <Grid xs={1} md={1}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "background.default",
                  borderRadius: 5,
                  p: 2,
                  m: 2,
                }}
              >
                <CommonBookImage width={100} height={150} />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    ml: 2,
                  }}
                >
                  <CommonTypography value="책 제목" variant="h6" bold={true} />
                  <CommonTypography
                    value="지은이"
                    variant="body2"
                    bold={false}
                  />
                  <CommonTypography
                    value="80/100"
                    variant="body2"
                    bold={false}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>

          {/* 유저 독서기록 미리보기 */}
          {/* 유저 독서기록 title */}
          <Box
            sx={{
              display: "flex",
              borderBottom: "3px solid",
              pt: 2,
              my: 2,
            }}
          >
            <CommonTitle
              value={
                "📓 " +
                userName +
                "님의 독서기록은 총 " +
                userPostList +
                "개가 있어요"
              }
            />
          </Box>

          {/* 유저 독서기록 영역 */}
          {/* 최신순 3개만 보여줌 */}
          <Grid
            container
            columns={{ xs: 1, md: 3 }}
            sx={{
              width: "100%",
              backgroundColor: "primary.main",
              borderRadius: 5,
              border: "1px solid",
            }}
          >
            {/* 유저 독서기록 item */}
            <Grid xs={1} md={1}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "background.default",
                  borderRadius: 5,
                  p: 2,
                  m: 2,
                }}
              >
                <CommonBookImage width={100} height={150} />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    ml: 2,
                  }}
                >
                  <CommonTypography value="책 제목" variant="h6" bold={true} />
                  <CommonTypography
                    value="지은이"
                    variant="body2"
                    bold={false}
                  />
                  <CommonTypography
                    value="독서기록 제목"
                    variant="body2"
                    bold={false}
                  />
                  <Box sx={{ display: "flex", mt: 1 }}>
                    <CommonTypography
                      value="📄댓글수"
                      variant="body2"
                      bold={true}
                    />
                    <CommonTypography
                      value="✨추천수"
                      variant="body2"
                      bold={true}
                    />
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* 유저페이지 서재 선택시 표출 영역 */}
      {/* 전체도서 표출 */}
      {selectTab === "lib" && (
        <Box>
          {/* tabmenu 서재 title */}
          <Box
            sx={{
              display: "flex",
              pt: 2,
              mt: 2,
            }}
          >
            <CommonTitle
              value={
                "📚 " +
                userName +
                "님의 서재에 총 " +
                userBookList +
                "권의 책이 있어요"
              }
            />
          </Box>
          <Grid
            container
            columns={{ xs: 1, md: 4 }}
            sx={{
              width: "100%",
              backgroundColor: "primary.main",
              borderRadius: 5,
              border: "1px solid",
            }}
          >
            {/* 유저 서재 도서 item */}
            <Grid xs={1} md={1}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "background.default",
                  borderRadius: 5,
                  p: 2,
                  m: 2,
                }}
              >
                <CommonBookImage width={100} height={150} />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    ml: 2,
                  }}
                >
                  <CommonTypography value="책 제목" variant="h6" bold={true} />
                  <CommonTypography
                    value="지은이"
                    variant="body2"
                    bold={false}
                  />
                  <CommonTypography
                    value="80/100"
                    variant="body2"
                    bold={false}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* 유저페이지 독서기록 선택시 표출 영역 */}
      {selectTab === "post" && (
        <Box>
          {/* title */}
          <Box
            sx={{
              display: "flex",
              pt: 2,
              mt: 2,
            }}
          >
            <CommonTitle
              value={
                "📓 " +
                userName +
                "님의 독서기록은 총 " +
                userPostList +
                "개가 있어요"
              }
            />
          </Box>

          {/* 유저 독서기록 영역 */}
          <Grid
            container
            columns={{ xs: 1, md: 3 }}
            sx={{
              width: "100%",
              backgroundColor: "primary.main",
              borderRadius: 5,
              border: "1px solid",
            }}
          >
            {/* 유저 독서기록 item */}
            <Grid xs={1} md={1}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "background.default",
                  borderRadius: 5,
                  p: 2,
                  m: 2,
                }}
              >
                <CommonBookImage width={100} height={150} />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    ml: 2,
                  }}
                >
                  <CommonTypography value="책 제목" variant="h6" bold={true} />
                  <CommonTypography
                    value="지은이"
                    variant="body2"
                    bold={false}
                  />
                  <CommonTypography
                    value="독서기록 제목"
                    variant="body2"
                    bold={false}
                  />
                  <Box sx={{ display: "flex", mt: 1 }}>
                    <CommonTypography
                      value="📄댓글수"
                      variant="body2"
                      bold={true}
                    />
                    <CommonTypography
                      value="✨추천수"
                      variant="body2"
                      bold={true}
                    />
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* 유저페이지 수정 선택시 표출 영역 */}
      {selectTab === "setting" && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
            maxWidth: 500,
            backgroundColor: "primary.main",
            borderRadius: 5,
            border: "1px solid",
            m: { xs: 2, md: 4 },
            p: 2,
          }}
        >
          <CommonTitle value="😊 계정 정보 수정하기" />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 2,
            }}
          >
            <CommonAvaratImage size={100} src={profileImg} />
            <Input type="file" onChange={handleChangeImg} />
          </Box>
          <CommonTextField
            type="required"
            id="user-name"
            label="닉네임"
            placeholder="기존 닉네임"
          />
          <CommonTextField
            type="required"
            id="user-introduce"
            label="자기소개"
            placeholder="기존 소개글"
          />
          <CommonBigButton value="수정완료" onClick={handleSetting} />
        </Box>
      )}
    </Box>
  );
};
export default UserPage;
