import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
} from "@mui/material";
import CommonTextField from "components/common/CommonTextField";
import React from "react";
import { useForm } from "react-hook-form";
import theme from "styles/theme";

interface PropsType {
  isOpen: boolean;
  handleClose: () => void;
}

interface FormValue {
  bookTitle: string;
  bookWriter: string;
  bookPublish: string;
}

const SearchBookSubmitDialog: React.FC<PropsType> = (props) => {
  // 화면 크기가 md보다 작아지면 Dialog를 fullscreen으로 띄움
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  // react hook form
  const { control, handleSubmit, reset } = useForm<FormValue>({
    defaultValues: {
      bookTitle: "",
      bookWriter: "",
      bookPublish: "",
    },
  });

  const handleDialogData = (data: FormValue) => {
    reset();
    props.handleClose();
    console.log(data);
  };

  return (
    <Dialog
      open={props.isOpen}
      onClose={props.handleClose}
      fullScreen={fullScreen}
      sx={{ minWidth: "300px" }}
    >
      {/* 제목 */}
      <DialogTitle>📕 책 추가하기</DialogTitle>

      {/* 컨텐트 */}
      <form>
        <DialogContent>
          <DialogContentText sx={{ color: "text.primary" }}>
            도서 검색으로 나오지 않는 책을 직접 등록해보세요!
          </DialogContentText>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CommonTextField
              name="bookTitle"
              control={control}
              rules={{ required: true }}
              textFieldProps={{
                id: "book-title",
                label: "Title",
                placeholder: "책 제목을 입력해주세요",
              }}
            />
            <CommonTextField
              name="bookWriter"
              control={control}
              rules={{ required: true }}
              textFieldProps={{
                id: "book-writer",
                label: "Writer",
                placeholder: "지은이를 입력해주세요",
              }}
            />
            <CommonTextField
              name="bookPublish"
              control={control}
              rules={{ required: true }}
              textFieldProps={{
                id: "book-publish",
                label: "Publish",
                placeholder: "출판사를 입력해주세요",
              }}
            />
          </Box>
        </DialogContent>
      </form>

      {/* 하단 버튼 */}
      <DialogActions>
        <Button onClick={props.handleClose}>취소</Button>
        <Button onClick={handleSubmit(handleDialogData)}>완료</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SearchBookSubmitDialog;
