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
import React, { useEffect, useState } from "react";
import CommonButton from "./CommonButton";
import CommonLink from "./CommonLink";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "store/user";
import CommonSnackBar from "./CommonSnackBar";

const HeaderBar = () => {
  const pages = [
    { name: "홈", link: "../main" },
    { name: "피드", link: "../feed" },
    { name: "독서모임", link: "../group" },
    { name: "내 서재", link: "../user/1" },
  ];

  // 네비게이션 메뉴 엘리먼트 셋팅
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  // 로그인 여부
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // snackbar 오픈
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    setSnackBarOpen(false);
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
    if (isLoggedIn) {
      // 로그아웃 작동
      dispatch(logout());
      setIsLoggedIn(false);
      setSnackBarOpen(true);
    } else {
      // 로그인 페이지로 이동
      navigate("../login");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    // 상단에 고정된 AppBar
    <AppBar position="sticky">
      <Container maxWidth="xl">
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
                <CommonLink key={page.name} to={page.link}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                </CommonLink>
              ))}
            </Menu>
          </Box>

          {/* 로고 */}
          <Box sx={{ flexGrow: { xs: "1", md: "0" } }}>
            <CommonLink to="../main">
              <Box
                component="img"
                sx={{
                  height: 30,
                  display: "flex",
                  mr: 2,
                }}
                src={process.env.PUBLIC_URL + "img/logo.png"}
              />
            </CommonLink>
          </Box>

          {/* 메뉴 버튼 */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            {pages.map((page) => (
              <CommonLink key={page.name} to={page.link}>
                <Button
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "text.primary",
                    display: "block",
                    "&:hover": { color: "text.secondary" },
                  }}
                >
                  {page.name}
                </Button>
              </CommonLink>
            ))}
          </Box>

          {/* snackbar */}
          <CommonSnackBar
            value="로그아웃 되었습니다."
            severity="success"
            open={snackBarOpen}
            handleClose={handleClose}
          />

          {/* 로그인, 로그아웃 버튼 */}
          <Box sx={{ flexGrow: 0, display: "flex" }}>
            <CommonButton
              value={isLoggedIn ? "LOGOUT" : "LOGIN"}
              outline={true}
              onClick={handleUserStatus}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default HeaderBar;
