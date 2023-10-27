import { Box, TextField } from "@mui/material";
import CommonBigButton from "components/common/CommonBigButton";
import CommonTextField from "components/common/CommonTextField";
import CommonTypography from "components/common/CommonTypography";

type PropsType = {
  handleChangeBook: (item: BookItem | null) => void;
  book: BookItem;
};

const WritePostForm: React.FC<PropsType> = (props) => {
  // 포스트(독서기록) 작성 완료 함수
  const handleSubmitPost = () => {
    console.log("submit post");
  };

  return (
    <Box sx={{ mt: 4 }}>
      {/* 선택된 책 정보 */}
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

      {/* 포스트(독서기록) 작성 폼 */}
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
