import { Box } from "@mui/material";
import { getBook } from "apis/books";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import MainPlanProgressCard from "./MainPlanProgressCard";

interface PropsType {
  // plan 정보로 book정보 조회
  planItem: PlanInfo;
}

const MainPlanCard = (props: PropsType) => {
  const [bookItem, setBookItem] = useState<BookInfo>();

  // react-query - get book info
  const { data: bookItemQuery } = useQuery("getBook", () =>
    getBook(props.planItem.bookId),
  );

  useEffect(() => {
    if (bookItemQuery) {
      setBookItem(bookItemQuery);
    }
  }, [bookItemQuery]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "background.default",
        boxShadow: "0px 0px 5px rgba(0,0,0,0.3)",
        borderRadius: 5,
        p: 2,
        mt: 2,
        mb: 2,
      }}
    >
      {bookItem && (
        <MainPlanProgressCard planItem={props.planItem} bookItem={bookItem} />
      )}
    </Box>
  );
};

export default MainPlanCard;
