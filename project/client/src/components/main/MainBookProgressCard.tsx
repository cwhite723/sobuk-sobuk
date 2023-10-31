import { Box, Button } from "@mui/material";
import CommonBookImage from "components/common/CommonBookImage";
import CommonTypography from "components/common/CommonTypography";
import MainBookProgressCover from "./MainBookProgressCover";
import MainBookEditDialog from "./MainBookEditDialog";
import React, { useState } from "react";

interface PropsType {
  bookItem: BookItem;
  isNonMember?: boolean;
}

const MainBookProgressCard: React.FC<PropsType> = (props) => {
  // Dialog open 여부
  const [openDialog, setOpenDialog] = useState(false);

  // Dialog 타입 관리
  const [dialogType, setDialogType] = useState<DialogType>("read");

  // 책 진행률 수정하기
  const handleEditBook = () => {
    setOpenDialog(true);
    setDialogType("progress");
  };

  // Dialog 닫기
  const handleClose = (): boolean => {
    setOpenDialog(false);
    return false;
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "left",
        alignItems: "center",
        backgroundColor: "background.default",
        boxShadow: "0px 0px 5px rgba(0,0,0,0.3)",
        borderRadius: 5,
        p: 2,
        mt: 2,
        mb: 2,
      }}
    >
      <MainBookEditDialog
        isOpen={openDialog}
        type={dialogType}
        handleClose={handleClose}
      />
      {(props.isNonMember || props.bookItem.bookState === "complete") && (
        <MainBookProgressCover
          status={
            props.isNonMember
              ? "nonMember"
              : props.bookItem.bookState === "complete"
              ? "complete"
              : "error"
          }
        />
      )}

      <CommonBookImage width={100} height={150} />
      <Box
        sx={{
          width: { xs: "100%", md: "auto" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flex: "1 0 auto",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", ml: 2, mr: 2 }}>
          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "end",
              borderBottom: "1px solid",
              pb: 1,
              mb: 1,
            }}
          >
            <CommonTypography
              value={props.bookItem.bookName + " |"}
              variant="h5"
              bold={true}
            />
            <CommonTypography
              value={props.bookItem.bookWriter}
              variant="h6"
              bold={true}
            />
            <Button
              sx={{
                position: "absolute",
                bottom: "5px",
                right: "0px",
                color: "text.primary",
                fontWeight: "bold",
                border: "1px solid",
                borderRadius: 5,
                p: 1,
              }}
              onClick={handleEditBook}
            >
              {props.bookItem.bookState === "complete" ? "완독" : "읽는 중"}
            </Button>
          </Box>

          <CommonTypography
            value="2023.06.03 ~ 2023.10.03"
            variant="body2"
            bold={true}
          />

          {/* 진행률 그래프 부분 */}
          {/* 따로 빼야함 */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <CommonTypography
              value="오늘은 368쪽까지 읽어야 해요"
              variant="body1"
              bold={true}
            />
            <CommonTypography
              value={
                props.bookItem.bookProgress + "/" + props.bookItem.bookPages
              }
              variant="body2"
              bold={true}
            />
          </Box>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "25px",
              backgroundColor: "primary.main",
              borderRadius: 5,
              mt: 1,
            }}
          >
            <Box
              sx={{
                position: "absolute",
                width: "80%",
                height: "25px",
                backgroundColor: "text.primary",
                borderRadius: 5,
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default MainBookProgressCard;
