import { Box } from "@mui/material";
import CommonTypography from "./CommonTypography";

interface PropsType {
  value: string;
}

const CommonTitle: React.FC<PropsType> = (props) => {
  return (
    // Section Title로 사용되는 Typo를 담은 컴포넌트
    <Box
      sx={{
        display: "flex",
        alignItems: "end",
        mb: 2,
      }}
    >
      <CommonTypography value={props.value} bold={true} variant="h5" />
    </Box>
  );
};
export default CommonTitle;
