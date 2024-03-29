import { Box } from "@mui/material";
import CustomTypography from "components/atoms/CustomTypography";

interface PropsType {
  title: string;
  contents: string;
}

const Contents = ({ title, contents }: PropsType) => {
  return (
    <Box sx={{ my: 4 }}>
      <CustomTypography text={"✅ " + title} variant="h5" bold={true} />
      <CustomTypography text={contents} variant="body1" bold={true} />
    </Box>
  );
};

export default Contents;
