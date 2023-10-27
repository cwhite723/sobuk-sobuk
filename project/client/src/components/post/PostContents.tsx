import { Box } from "@mui/material";
import CommonTitle from "components/common/CommonTitle";
import CommonTypography from "components/common/CommonTypography";

interface PropsType {
  title: string;
  contents: string;
}

const PostContents: React.FC<PropsType> = (props) => {
  return (
    <Box sx={{ my: 4 }}>
      <CommonTitle value={props.title} />
      <CommonTypography value={props.contents} variant="body1" bold={false} />
    </Box>
  );
};

export default PostContents;
