import { Box, TextField } from "@mui/material";
import CommonBigButton from "components/common/CommonBigButton";
import CommonTextField from "components/common/CommonTextField";
import CommonTypography from "components/common/CommonTypography";
import { useForm } from "react-hook-form";

interface PropsType {
  handleChangeBook: (item: BookItem | null) => void;
  book: BookItem;
}

interface FormValue {
  postTitle: string;
  postContents: string;
}

const WritePostForm: React.FC<PropsType> = (props) => {
  // react hook form
  const { control, handleSubmit } = useForm<FormValue>({
    defaultValues: {
      postTitle: "",
      postContents: "",
    },
  });

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
      <form>
        <CommonTextField
          name="postTitle"
          control={control}
          rules={{ required: true }}
          textFieldProps={{
            id: "post-title",
            label: "Post Title",
            placeholder: "제목을 입력하세요",
          }}
        />
        <CommonTextField
          name="postContents"
          control={control}
          rules={{ required: true }}
          textFieldProps={{
            id: "post-contents",
            label: "Post Contents",
            placeholder: "내용을 입력하세요",
            rows: "10",
            multiline: true,
          }}
        />
        <CommonBigButton
          value="작성 완료"
          onClick={handleSubmit(handleSubmitPost)}
        />
      </form>
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
