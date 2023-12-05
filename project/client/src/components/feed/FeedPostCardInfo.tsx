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
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "background.default",
          borderRadius: 5,
          boxShadow: "0px 0px 5px rgba(0,0,0,0.3)",
          my: 2,
          p: 1,
        }}
      >
        {/* 책정보 */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            pt: 1,
          }}
        >
          <CommonTypography
            text={postItem.bookTitle}
            variant="body1"
            bold={true}
          />
          <CommonTypography
            text={"📝" + postItem.bookAuthor}
            variant="body2"
            bold={true}
          />
        </Box>

        {/* post 이미지 */}
        <CommonBookImage width={100} height={150} src={postItem.imageUrl} />

        {/* 포스트 정보 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 2,
          }}
        >
          <CommonTypography
            text={postItem.postTitle}
            variant="h5"
            bold={true}
          />
          <CommonTypography
            text={postItem.content.substring(0, 20)}
            variant="body2"
            bold={false}
          />
        </Box>
      </Box>
    </CommonLink>
  );
};
export default FeedPostCardInfo;
