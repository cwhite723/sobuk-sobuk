import { Box } from "@mui/material";
import CommonBookImage from "components/common/CommonBookImage";
import CommonLink from "components/common/CommonLink";
import CommonTypography from "components/common/CommonTypography";

interface PropsType {
  postItem: PostInfo;
}

const FeedPostCardInfo = (props: PropsType) => {
  return (
    <CommonLink to={"../post/" + props.postItem.postId}>
      <Box
        sx={{
          display: "flex",
          backgroundColor: "background.default",
          borderRadius: 5,
          boxShadow: "0px 0px 5px rgba(0,0,0,0.3)",
          my: 2,
          py: 2,
        }}
      >
        {/* 책 이미지 - 수정 필요 */}
        <CommonBookImage width={100} height={150} />
        <Box>
          <Box sx={{ display: "flex", alignItems: "baseline", my: 2 }}>
            <CommonTypography
              value={props.postItem.bookTitle}
              variant="h6"
              bold={true}
            />
            <CommonTypography
              value={props.postItem.bookAuthor}
              variant="body2"
              bold={true}
            />
          </Box>
          <Box>
            <CommonTypography
              value={props.postItem.postTitle}
              variant="body2"
              bold={true}
            />
            <CommonTypography
              value={props.postItem.content}
              variant="body2"
              bold={false}
            />
          </Box>
        </Box>
      </Box>
    </CommonLink>
  );
};
export default FeedPostCardInfo;
