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
import CommonTypography from "components/common/CommonTypography";
import React from "react";
import { useForm } from "react-hook-form";
import theme from "styles/theme";

interface PropsType {
  isOpen: boolean;
  selectedBook: BookInfo;
  handleClose: () => void;
}

interface FormValue {
  totalPages: number;
  startDate: Date;
  endDate: Date;
}

const SearchBookReadDialog: React.FC<PropsType> = (props) => {
  // 화면 크기가 md보다 작아지면 Dialog를 fullscreen으로 띄움
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  // react hook form
  const { control, handleSubmit, reset } = useForm<FormValue>({
    defaultValues: {
      totalPages: 0,
      startDate: undefined,
      endDate: undefined,
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
      <DialogTitle>📖 완독 기간 설정하기</DialogTitle>

      {/* 컨텐트 */}
      <form>
        <DialogContent>
          <DialogContentText sx={{ color: "text.primary" }}>
            기간을 설정하고 독서를 습관으로 만들어보세요!
          </DialogContentText>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "primary.main",
                borderRadius: 5,
                p: 1,
                m: 1,
              }}
            >
              <CommonTypography
                value={props.selectedBook.title}
                variant="h6"
                bold={true}
              />
              <CommonTypography
                value={
                  props.selectedBook.author +
                  " | " +
                  props.selectedBook.publisher
                }
                variant="body1"
                bold={false}
              />
            </Box>
            <CommonTextField
              name="totalPages"
              control={control}
              rules={{ required: true }}
              textFieldProps={{
                id: "total-pages",
                label: "Total Pages",
                placeholder: "총 페이지 수를 입력해주세요",
                type: "number",
              }}
            />
            <CommonTextField
              name="startDate"
              control={control}
              rules={{ required: true }}
              textFieldProps={{
                id: "start-date",
                label: "Start",
                placeholder: "시작일을 입력해주세요",
                type: "date",
              }}
            />
            <CommonTextField
              name="endDate"
              control={control}
              rules={{ required: true }}
              textFieldProps={{
                id: "end-date",
                label: "End",
                placeholder: "종료일을 입력해주세요",
                type: "date",
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

export default SearchBookReadDialog;
