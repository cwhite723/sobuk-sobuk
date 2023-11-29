import { Box } from "@mui/material";
import CommonBookImage from "components/common/CommonBookImage";
import CommonLink from "components/common/CommonLink";
import CommonTypography from "components/common/CommonTypography";

interface PropsType {
  postItem: PostInfo;
}

const FeedPostCardInfo = ({ postItem }: PropsType) => {
  return (
    <CommonLink to={"../post/" + postItem.postId}>
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
        {/* post 이미지 */}
        <CommonBookImage width={100} height={150} src={postItem.imageUrl} />

        <Box>
          <Box sx={{ display: "flex", alignItems: "baseline", my: 2 }}>
            <CommonTypography
              text={postItem.bookTitle}
              variant="h6"
              bold={true}
            />
            <CommonTypography
              text={postItem.bookAuthor}
              variant="body2"
              bold={true}
            />
          </Box>
          <Box>
            <CommonTypography
              text={postItem.postTitle}
              variant="body2"
              bold={true}
            />
            <CommonTypography
              text={postItem.content}
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
