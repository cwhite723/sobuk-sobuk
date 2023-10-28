import { Typography } from "@mui/material";

interface PropsType {
  value: string;
  variant: "h5" | "h6" | "body1" | "body2";
  bold: boolean;
  error?: boolean;
}

const CommonTypography: React.FC<PropsType> = (props) => {
  return (
    <Typography
      variant={props.variant}
      sx={{
        fontWeight: props.bold ? 800 : 400,
        mr: 2,
        color: props.error ? "error.main" : "text.primary",
      }}
    >
      {props.value}
    </Typography>
  );
};
export default CommonTypography;
