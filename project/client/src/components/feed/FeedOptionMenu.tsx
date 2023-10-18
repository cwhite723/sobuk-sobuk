import { Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CommonLink from "components/common/CommonLink";
import CommonTypography from "components/common/CommonTypography";

const FeedOptionMenu = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <CommonTypography value="최신순" variant="body2" bold={true} />
        <CommonTypography value="댓글순" variant="body2" bold={false} />
        <CommonTypography value="추천순" variant="body2" bold={false} />
      </Box>
      <Box>
        <CommonLink to="../write">
          <EditIcon />
        </CommonLink>
      </Box>
    </Box>
  );
};

export default FeedOptionMenu;
