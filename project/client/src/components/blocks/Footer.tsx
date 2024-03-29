import { Box } from "@mui/material";
import CustomTypography from "../atoms/CustomTypography";

// 페이지 하단 정보
const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        m: 3,
      }}
    >
      {/* 로고 */}
      <Box
        component="img"
        sx={{
          height: 30,
          display: "flex",
          mr: 2,
        }}
        src={import.meta.env.BASE_URL + "img/logo.png"}
      />
      {/* copyright */}
      <CustomTypography
        text="Copyright ⓒ 2023 소북소북 All Rights Reserved."
        variant="body2"
        bold={true}
      />
    </Box>
  );
};

export default Footer;
