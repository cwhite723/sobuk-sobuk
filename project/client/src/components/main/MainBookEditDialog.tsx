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
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import theme from "styles/theme";

interface PropsType {
  isOpen: boolean;
  type: DialogType;
  handleClose: () => boolean;
}

interface FormValue {
  todayPages?: number;

  bookTitle?: string;
  bookWriter?: string;
  bookPublish?: string;

  totalPages?: number;
  startDate?: Date;
  endDate?: Date;
}

const MainBookEditDialog: React.FC<PropsType> = (props) => {
  // 화면 크기가 md보다 작아지면 Dialog를 fullscreen으로 띄움
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  // react hook form
  const { control, handleSubmit, reset } = useForm<FormValue>({
    defaultValues: {
      todayPages: 0,

      bookTitle: "",
      bookWriter: "",
      bookPublish: "",

      totalPages: 0,
      startDate: undefined,
      endDate: undefined,
    },
  });

  const [isClose, setIsClose] = useState(!props.isOpen);

  const handleDialogData = (data: FormValue) => {
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
      <DialogTitle>
        {props.type === "progress"
          ? "🔖 오늘 읽은 페이지 기록하기"
          : props.type === "submit"
          ? "📕 책 추가하기"
          : "📖 완독 기간 설정하기"}
      </DialogTitle>

      {/* 컨텐트 */}
      <form>
        <DialogContent>
          <DialogContentText sx={{ color: "text.primary" }}>
            {props.type === "progress"
              ? "오늘은 몇 페이지까지 읽었나요? 기록하고 완독까지 달려보세요!"
              : props.type === "submit"
              ? "도서 검색으로 나오지 않는 책을 직접 등록해보세요!"
              : "기간을 설정하고 독서를 습관으로 만들어보세요!"}
          </DialogContentText>

          {props.type === "progress" ? (
            <CommonTextField
              name="todayPages"
              control={control}
              textFieldProps={{
                id: "today-pages",
                label: "Today Pages",
                placeholder: "오늘은 몇 페이지까지 읽었나요?",
                type: "number",
              }}
            />
          ) : props.type === "submit" ? (
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
          ) : (
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
                <CommonTypography value="책 제목" variant="h6" bold={true} />
                <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                  <CommonTypography
                    value="저자 | 출판사"
                    variant="body1"
                    bold={false}
                  />
                </Box>
              </Box>
              <CommonTextField
                name="totalPages"
                control={control}
                rules={{ required: true }}
                textFieldProps={{
                  id: "book-pages",
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
          )}
        </DialogContent>

        {/* 하단 버튼 */}
        <DialogActions>
          <Button
            onClick={() => {
              props.handleClose = () => {
                return isClose;
              };
              reset();
            }}
          >
            취소
          </Button>
          <Button onClick={handleSubmit(handleDialogData)}>완료</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default MainBookEditDialog;
