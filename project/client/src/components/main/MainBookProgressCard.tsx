import { Box, Button } from "@mui/material";
import CommonBookImage from "components/common/CommonBookImage";
import CommonTypography from "components/common/CommonTypography";
import MainBookProgressCover from "./MainBookProgressCover";
import React, { useEffect, useState } from "react";
import MainBookProgressDialog from "./MainBookProgressDialog";
import MainBookProgressBar from "./MainBookProgressBar";

interface PropsType {
  bookItem: BookItem;
  isNonMember?: boolean;
}

const MainBookProgressCard: React.FC<PropsType> = (props) => {
  // Dialog open 여부
  const [openDialog, setOpenDialog] = useState(false);

  // stringdate array
  const [dates, setDates] = useState(["", ""]);

  // 책 진행률 수정하기
  const handleEditBook = () => {
    setOpenDialog(true);
  };

  // Dialog 닫기
  const handleClose = () => {
    setOpenDialog(false);
  };

  const getStringDate = (dates: Date[]) => {
    const stringDate: string[] = [];
    for (let i = 0; i < dates.length; i++) {
      stringDate[i] =
        dates[i].getFullYear() +
        "-" +
        dates[i].getMonth() +
        "-" +
        dates[i].getDay();
    }
    return stringDate;
  };

  useEffect(() => {
    if (props.bookItem.bookDate) {
      setDates(getStringDate(props.bookItem.bookDate));
    } else {
      setDates(["0000-00-00", "0000-00-00"]);
    }
  }, []);

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
      {props.bookItem && (
        <MainBookProgressDialog
          isOpen={openDialog}
          handleClose={handleClose}
          selectedUserBook={props.bookItem}
        />
      )}
      {(props.isNonMember || props.bookItem.bookState === "complete") && (
        <MainBookProgressCover
          state={
            props.isNonMember
              ? "nonMember"
              : props.bookItem.bookState === "complete"
              ? "complete"
              : "error"
          }
        />
      )}
      {/* 책정보 */}
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
            value={dates[0] + " ~ " + dates[1]}
            variant="body2"
            bold={true}
          />

          {/* 진행률 그래프 부분 */}
          {/* 기간 정보도 넘겨서 계산 필요 */}
          <MainBookProgressBar
            dateInfo={props.bookItem.bookDate ? props.bookItem.bookDate : []}
            progressInfo={
              props.bookItem.bookProgress ? props.bookItem.bookProgress : 0
            }
            pagesInfo={props.bookItem.bookPages}
          />
        </Box>
      </Box>
    </Box>
  );
};
export default MainBookProgressCard;
