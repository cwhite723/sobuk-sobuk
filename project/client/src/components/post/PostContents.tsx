import { Box } from "@mui/material";
import CommonTitle from "components/common/CommonTitle";
import CommonTypography from "components/common/CommonTypography";

interface PropsType {
  title: string;
  contents: string;
}

const PostContents = ({ title, contents }: PropsType) => {
  return (
    <Box sx={{ my: 4 }}>
      <CommonTitle text={title} />
      <CommonTypography text={contents} variant="body1" bold={false} />
    </Box>
  );
};

export default PostContents;
