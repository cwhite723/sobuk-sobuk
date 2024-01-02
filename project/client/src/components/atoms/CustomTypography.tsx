import { Typography } from "@mui/material";

interface PropsType {
  text: string;
  variant: "h5" | "h6" | "body1" | "body2";
  bold: boolean;
  error?: boolean;
}

// 공통 타이포그라피
const CustomTypography = ({ text, variant, bold, error }: PropsType) => {
  return (
    <Typography
      variant={variant}
      sx={{
        fontWeight: bold ? 800 : 400,
        color: error ? "error.main" : "text.primary",
      }}
    >
      {text}
    </Typography>
  );
};
export default CustomTypography;
