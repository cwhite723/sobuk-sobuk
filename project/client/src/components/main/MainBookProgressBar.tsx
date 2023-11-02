import { Box } from "@mui/material";
import CommonTypography from "components/common/CommonTypography";
import { useEffect, useState } from "react";

interface PropsType {
  progressInfo: number;
  pagesInfo: number;
  dateInfo: Date[];
}

const MainBookProgressBar = (props: PropsType) => {
  const [timeDiff, setTimeDiff] = useState(0);

  // 전체 기간 구하기
  const getTimeDiff = (dates: Date[]) => {
    const day = 1000 * 60 * 60 * 24;
    const timeDiff = +dates[1] - +dates[0];
    return Math.floor(timeDiff / day);
  };

  // 현재 날짜 부터 끝까지 기간 구하기
  const getTimeDiffFromToday = (date: Date) => {
    const day = 1000 * 60 * 60 * 24;
    const timeDiff = +date - +Date.now();
    return Math.ceil(timeDiff / day);
  };

  const getTodayPages = (progress: number, pages: number, diff: number) => {
    return progress + Math.ceil((pages - progress) / diff);
  };

  useEffect(() => {
    setTimeDiff(getTimeDiffFromToday(props.dateInfo[1]));
  }, []);
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <CommonTypography
          value={
            "오늘은 " +
            getTodayPages(props.progressInfo, props.pagesInfo, timeDiff) +
            "쪽까지 읽어야 해요"
          }
          variant="body1"
          bold={true}
        />
        <CommonTypography
          value={props.progressInfo + "/" + props.pagesInfo}
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
        {props.progressInfo !== undefined && (
          <Box
            sx={{
              position: "absolute",
              width: props.progressInfo / (props.pagesInfo / 100) + "%",
              height: "25px",
              backgroundColor: "text.primary",
              borderRadius: 5,
            }}
          />
        )}
      </Box>
    </>
  );
};

export default MainBookProgressBar;
