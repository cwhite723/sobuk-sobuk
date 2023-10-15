import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import theme from "styles/theme";

interface PropsType {
  isOpen: boolean;
  type: "edit" | "add" | "read";
}

const MainBookEditDialog: React.FC<PropsType> = (props) => {
  const [dialogOpen, setDialogOpen] = React.useState(props.isOpen);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onClose={handleClose} fullScreen={fullScreen}>
      <DialogTitle>
        {props.type === "edit"
          ? "🔖 오늘 읽은 페이지 기록하기"
          : props.type === "add"
          ? "📕 책 추가하기"
          : "📖 완독 기간 설정하기"}
      </DialogTitle>
      <DialogContent>
        {props.type === "edit" ? (
          <TextField
            autoFocus
            id="todayPages"
            label="오늘의 페이지"
            type="number"
          />
        ) : props.type === "add" ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              maxWidth: 500,
            }}
          >
            <TextField
              autoFocus
              id="bookTitle"
              label="책 제목"
              type="required"
            />
            <TextField id="bookWriter" label="저자" type="required" />
            <TextField id="bookPublish" label="출판사" type="required" />
            <TextField id="bookPages" label="전체 페이지" type="required" />
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              maxWidth: 500,
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Typography>책 제목</Typography>
              <Typography>책 저자</Typography>
              <Typography>책 출판사</Typography>
            </Box>
            <TextField
              autoFocus
              id="bookPages"
              label="전체 페이지"
              type="required"
            />
            <TextField id="startDate" label="시작일" type="date" />
            <TextField id="endDate" label="종료일" type="date" />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>취소</Button>
        <Button onClick={handleClose}>완료</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MainBookEditDialog;
