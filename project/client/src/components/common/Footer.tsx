import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", m: 3 }}>
      <Box
        component="img"
        sx={{
          height: 30,
          display: "flex",
          mr: 2,
        }}
        src={process.env.PUBLIC_URL + "img/logo.png"}
      />
      <Typography>Copyright ⓒ 2023 소북소북 All Rights Reserved.</Typography>
    </Box>
  );
};

export default Footer;
