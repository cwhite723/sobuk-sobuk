import { Typography } from "@mui/material";
import { TypographyProps } from "@mui/material";

interface PropsType {
  text: string;
  variant: "h5" | "h6" | "body1" | "body2";
  bold: boolean;
  error?: boolean;
}

interface MuiProps {
  typographyProps?: TypographyProps;
}

// 공통 타이포그라피
const CustomTypography = ({
  text,
  variant,
  bold,
  error,
  typographyProps,
}: PropsType & MuiProps) => {
  return (
    <Typography
      {...typographyProps}
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
