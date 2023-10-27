import { Box, TextField } from "@mui/material";
import CommonBigButton from "components/common/CommonBigButton";
import CommonTextField from "components/common/CommonTextField";
import CommonTypography from "components/common/CommonTypography";

type PropsType = {
  handleChangeBook: (item: BookItem | null) => void;
  book: BookItem;
};

const WritePostForm: React.FC<PropsType> = (props) => {
  const handleSubmitPost = () => {
    console.log("submit post");
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", alignItems: "baseline" }}>
        <CommonTypography
          value={"👉" + props.book.bookName}
          variant="h5"
          bold={true}
        />
        <CommonTypography
          value={props.book.writer}
          variant="body1"
          bold={true}
        />
      </Box>
      <CommonTextField
        id="post-title"
        label="Post Title"
        type="required"
        placeholder="제목을 입력하세요"
      />
      <TextField
        id="post-contents"
        label="Post Contents"
        type="required"
        placeholder="내용을 입력하세요"
        multiline
        fullWidth
        rows={10}
        sx={{ mt: 2 }}
      />
      <CommonBigButton value="작성 완료" onClick={handleSubmitPost} />
      <CommonBigButton
        value="다른 책 선택하기"
        onClick={() => {
          props.handleChangeBook(null);
        }}
      />
    </Box>
  );
};
export default WritePostForm;
