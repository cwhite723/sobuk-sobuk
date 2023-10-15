import { Box } from "@mui/material";
import CommonLink from "components/common/CommonLink";
import CommonTypography from "components/common/CommonTypography";
import EditIcon from "@mui/icons-material/Edit";

const FeedTopMenu = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "3px solid",
        p: 2,
        pb: 1,
      }}
    >
      <Box sx={{ display: "flex" }}>
        <CommonTypography value="📚전체" variant="h6" bold={true} />
        <CommonTypography value="💖팔로잉" variant="h6" bold={false} />
      </Box>
      <Box>
        <CommonLink to="../write">
          <EditIcon />
        </CommonLink>
      </Box>
    </Box>
  );
};

export default FeedTopMenu;
