import { Box } from "@mui/material";
import CommonTypography from "./CommonTypography";

interface PropsType {
  value: string;
}

const CommonTitle: React.FC<PropsType> = (props) => {
  return (
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
