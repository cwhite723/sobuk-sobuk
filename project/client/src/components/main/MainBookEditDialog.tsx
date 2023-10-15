import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import theme from "styles/theme";

interface PropsType {
  isOpen: boolean;
  type: "edit" | "add";
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
          : "📕 책 추가하기"}
      </DialogTitle>
      <DialogContent>
        {props.type === "edit" ? (
          <TextField
            autoFocus
            id="todayPages"
            label="오늘의 페이지"
            type="number"
          />
        ) : (
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
