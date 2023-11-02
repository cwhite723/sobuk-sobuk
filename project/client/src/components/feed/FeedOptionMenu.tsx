import { Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CommonLink from "components/common/CommonLink";
import CommonTypography from "components/common/CommonTypography";

const FeedOptionMenu = () => {
  // 구현 필요
  // 클릭 시 데이터 호출 변경
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        pb: 2,
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
