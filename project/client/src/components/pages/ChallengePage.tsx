import { Box, Pagination } from "@mui/material";
import Grid from "@mui/system/Unstable_Grid";
import BookImage from "components/atoms/BookImage";
import CustomLink from "components/atoms/CustomLink";
import CustomTypography from "components/atoms/CustomTypography";
import SmallButton from "components/atoms/SmallButton";
import TabMenu from "components/blocks/TabMenu";
import { challengeTabMenus } from "constants/menus";
import { useState } from "react";

const ChallengePage = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number | null>(10);

  // 현재 선택된 정렬 옵션 탭 메뉴
  const [nowOptionTab, setNowOptionTab] = useState(challengeTabMenus[0]);

  // 선택된 정렬 옵션 탭 메뉴 변경 함수
  const handleOptionTabFocus = (newTab: TabMenuType) => {
    setNowOptionTab(newTab);
  };

  // pagination 함수
  // page값에 따라 데이터 변경
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  const handleClickEvent = () => {
    console.log("참여하기");
  };

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      {/* challenge 생성 버튼 */}
      <Box sx={{ position: "fixed", top: "100px", right: "50px" }}>
        <CustomLink to="../create">
          <CustomTypography text="✨생성하기" variant="body1" bold={true} />
        </CustomLink>
      </Box>

      {/* 챌린지 상단(정렬) */}
      <TabMenu
        handelTabFocus={handleOptionTabFocus}
        nowTab={nowOptionTab}
        allTabs={challengeTabMenus}
      />

      {/* 챌린지 container 영역 */}
      <Grid container spacing={4} columns={{ xs: 1, md: 10 }}>
        {/* 챌린지 item */}
        <Grid xs="auto" md={5} sx={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "left",
              backgroundColor: "primary.main",
              borderRadius: 5,
              boxShadow: "0px 0px 5px rgba(0,0,0,0.5)",
              p: 3,
            }}
          >
            <Box
              sx={{ width: "100%", display: "flex", justifyContent: "center" }}
            >
              <BookImage src={null} width={130} height={180} />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <CustomLink to="../challenge/1">
                <CustomTypography
                  text="챌린지 도서명"
                  variant="h6"
                  bold={true}
                />
              </CustomLink>
              <SmallButton
                buttonText="참여하기"
                outline={false}
                handleClickEvent={handleClickEvent}
              />
            </Box>

            <Box sx={{ display: "flex", mt: 2 }}>
              <CustomTypography
                text="인원"
                variant="body2"
                bold={true}
                typographyProps={{ mr: 1 }}
              />
              <CustomTypography
                text="10/30"
                variant="body2"
                bold={false}
                typographyProps={{ mr: 2 }}
              />
              <CustomTypography
                text="달성률"
                variant="body2"
                bold={true}
                typographyProps={{ mr: 1 }}
              />
              <CustomTypography
                text="50%"
                variant="body2"
                bold={false}
                typographyProps={{ mr: 2 }}
              />
              <CustomTypography
                text="시작일"
                variant="body2"
                bold={true}
                typographyProps={{ mr: 1 }}
              />
              <CustomTypography
                text="2024.01.28"
                variant="body2"
                bold={false}
                typographyProps={{ mr: 2 }}
              />
            </Box>

            <CustomTypography
              text="#장르 #태그"
              variant="body2"
              bold={true}
              typographyProps={{ mt: 2 }}
            />
          </Box>
        </Grid>
        {/* 기본 전체 데이터 */}
      </Grid>

      <Box
        sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 4 }}
      >
        {totalPages ? (
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
          />
        ) : (
          <CustomTypography
            text="챌린지가 존재하지 않습니다."
            variant="h5"
            bold={true}
          />
        )}
      </Box>
    </Box>
  );
};

export default ChallengePage;
