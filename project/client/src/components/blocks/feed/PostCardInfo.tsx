import { Box } from "@mui/material";
import BookImage from "components/atoms/BookImage";
import CustomLink from "components/atoms/CustomLink";
import CustomTypography from "components/atoms/CustomTypography";

interface PropsType {
  postItem: PostInfo;
}

const PostCardInfo = ({ postItem }: PropsType) => {
  return (
    <CustomLink to={"../post/" + postItem.postId}>
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
          <CustomTypography
            text={postItem.bookTitle}
            variant="body1"
            bold={true}
          />
          <CustomTypography
            text={"📝" + postItem.bookAuthor}
            variant="body2"
            bold={true}
          />
        </Box>

        {/* post 이미지 */}
        <BookImage width={100} height={150} src={postItem.imageUrl} />

        {/* 포스트 정보 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 2,
          }}
        >
          <CustomTypography
            text={postItem.postTitle}
            variant="h5"
            bold={true}
          />
          <CustomTypography
            text={postItem.content.substring(0, 20)}
            variant="body2"
            bold={false}
          />
        </Box>
      </Box>
    </CustomLink>
  );
};
export default PostCardInfo;
