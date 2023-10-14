import Grid from "@mui/material/Unstable_Grid2";
import { Outlet } from "react-router-dom";

const SubLayout = () => {
  return (
    // login, join 페이지에 적용되는 레이아웃
    <Grid container spacing={2} width="100%">
      {/* 사이드 영역 */}
      <Grid xs />
      {/* 컨텐츠 영역 */}
      <Grid xs={6} disableEqualOverflow>
        <Outlet />
      </Grid>
      {/* 사이드 영역 */}
      <Grid xs />
    </Grid>
  );
};

export default SubLayout;
