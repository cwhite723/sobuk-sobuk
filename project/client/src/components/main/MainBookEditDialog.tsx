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
import theme from "styles/theme";

interface PropsType {
  isOpen: boolean;
  type: "edit" | "add" | "read";
  handleClose: () => void;
}

const MainBookEditDialog: React.FC<PropsType> = (props) => {
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog
      open={props.isOpen}
      onClose={props.handleClose}
      fullScreen={fullScreen}
      sx={{ minWidth: "300px" }}
    >
      <DialogTitle>
        {props.type === "edit"
          ? "🔖 오늘 읽은 페이지 기록하기"
          : props.type === "add"
          ? "📕 책 추가하기"
          : "📖 완독 기간 설정하기"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: "text.primary" }}>
          {props.type === "edit"
            ? "오늘은 몇 페이지까지 읽었나요? 기록하고 완독까지 달려보세요!"
            : props.type === "add"
            ? "도서 검색으로 나오지 않는 책을 직접 등록해보세요!"
            : "기간을 설정하고 독서를 습관으로 만들어보세요!"}
        </DialogContentText>

        {props.type === "edit" ? (
          <CommonTextField
            id="today-page"
            label="Today Page"
            placeholder="오늘은 몇 페이지까지 읽었나요?"
            type="number"
          />
        ) : props.type === "add" ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CommonTextField
              id="book-title"
              label="Title"
              placeholder="책 제목을 입력해주세요"
              type="required"
            />
            <CommonTextField
              id="book-writer"
              label="Writer"
              placeholder="지은이를 입력해주세요"
              type="required"
            />
            <CommonTextField
              id="book-publish"
              label="Publish"
              placeholder="출판사를 입력해주세요"
              type="required"
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
              id="book-pages"
              label="Total Pages"
              placeholder="총 페이지 수를 입력해주세요"
              type="number"
            />
            <CommonTextField
              id="start-date"
              label="Start"
              placeholder="시작일을 입력해주세요"
              type="date"
            />
            <CommonTextField
              id="end-date"
              label="End"
              placeholder="종료일을 입력해주세요"
              type="date"
            />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>취소</Button>
        <Button onClick={props.handleClose}>완료</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MainBookEditDialog;
