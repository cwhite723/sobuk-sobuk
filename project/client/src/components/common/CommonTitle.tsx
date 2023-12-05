import { Box } from "@mui/material";
import CommonTypography from "./CommonTypography";

interface PropsType {
  text: string;
}

// Section Title 컴포넌트
const CommonTitle = ({ text }: PropsType) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "end",
        mb: 2,
      }}
    >
      <CommonTypography text={text} bold={true} variant="h5" />
    </Box>
  );
};
export default CommonTitle;
