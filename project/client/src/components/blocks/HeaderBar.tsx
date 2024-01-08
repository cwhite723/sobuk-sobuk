import {
  AppBar,
  Container,
  Toolbar,
  Box,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import SmallButton from "../atoms/SmallButton";
import CustomLink from "../atoms/CustomLink";
import { useNavigate } from "react-router-dom";
import CustomSnackBar from "./CustomSnackBar";
import CustomTypography from "../atoms/CustomTypography";
import { useMutation } from "react-query";
import { useLogOut } from "hooks/mutates/useMemberMutations";
import { pages } from "constants/menus";
import { getStoredMember, getStoredToken } from "utils/get";
import AvaratImage from "components/atoms/AvatarImage";
import useMemberStore from "store/store";

const HeaderBar = () => {
  const navigate = useNavigate();

  // 네비게이션 메뉴 엘리먼트 셋팅
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  // 로그인 여부 토큰으로 확인
  const memberToken = getStoredToken();
  // redux에 저장된 유저정보 확인
  const memberInfo = getStoredMember();

  // snackbar 오픈 여부
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [errorSnackBarOpen, setErrorSnackBarOpen] = useState(false);

  // react-query - POST logout
  const { mutate: logOutMutate } = useLogOut();

  // snackbar 닫기 함수
  const handleClose = () => {
    setSnackBarOpen(false);
    setErrorSnackBarOpen(false);
  };

  // 네비게이션 메뉴 열기
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  // 네비게이션 메뉴 닫기
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // 로그인 상태에 따라 로그인 또는 로그아웃 작동
  const handleUserStatus = () => {
    if (memberToken) {
      // 로그아웃 작동
      logOutMutate(memberToken, {
        onSuccess: () => {
          // 로그아웃 성공
          setSnackBarOpen(true);
        },
        onError: (error) => {
          // 로그아웃 실패
          setErrorSnackBarOpen(true);
          console.log(error);
        },
      });
    }

    // 로그인 페이지로 이동
    navigate("../log-in");
  };

  return (
    // 상단에 고정된 AppBar
    <AppBar position="sticky">
      <Container maxWidth="xl">
        {/* snackbar */}
        <CustomSnackBar
          text="로그아웃 되었습니다."
          severity="success"
          open={snackBarOpen}
          handleSnackBarClose={handleClose}
        />

        {/* snackbar */}
        <CustomSnackBar
          text="로그아웃에 실패했습니다."
          severity="error"
          open={errorSnackBarOpen}
          handleSnackBarClose={handleClose}
        />

        <Toolbar>
          {/* 네비게이션 메뉴 버튼 */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>

            {/* 네비게이션 메뉴 버튼 클릭시 출력 */}
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <CustomLink key={page.name} to={page.link}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" fontWeight="bold">
                      {page.name}
                    </Typography>
                  </MenuItem>
                </CustomLink>
              ))}
            </Menu>
          </Box>

          {/* 로고 */}
          <Box sx={{ flexGrow: { xs: "1", md: "0" } }}>
            <CustomLink to="../main">
              <Box
                component="img"
                sx={{
                  height: 30,
                  display: "flex",
                  mr: 2,
                }}
                src={import.meta.env.BASE_URL + "img/logo.png"}
              />
            </CustomLink>
          </Box>

          {/* 메뉴 버튼 */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            {pages.map((page) => (
              <CustomLink key={page.name} to={page.link}>
                <Button
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "text.primary",
                    display: "block",
                    "&:hover": { color: "text.secondary" },
                    fontWeight: "bold",
                  }}
                >
                  {page.name}
                </Button>
              </CustomLink>
            ))}
          </Box>

          {/* 로그인, 로그아웃 버튼 */}
          <Box
            sx={{
              flexGrow: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {memberInfo && (
              <CustomLink to="../my">
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <AvaratImage size={30} src={memberInfo.image} />
                  <CustomTypography
                    text={memberInfo.nickname + "님"}
                    bold={true}
                    variant="body1"
                  />
                </Box>
              </CustomLink>
            )}
            <SmallButton
              buttonText={memberToken ? "LOGOUT" : "LOGIN"}
              outline={true}
              handleClickEvent={handleUserStatus}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default HeaderBar;
