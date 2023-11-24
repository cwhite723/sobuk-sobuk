import { Box } from "@mui/material";
import { getAllBooks, getBook } from "apis/books";
import CommonButton from "components/common/CommonButton";
import CommonTypography from "components/common/CommonTypography";
import { useQuery } from "react-query";

type PropsType = {
  handleSelectPlan: (planInfo: PlanInfo) => void;
  // bookId: number;
  // bookTitle: string;
  planInfo: PlanInfo;
};

const WritePostBookItem = (props: PropsType) => {
  // react-query 책 정보
  // const { data: bookInfo } = useQuery(
  //   ["getBook", props.bookId],
  //   () => getBook(props.bookId),
  //   {
  //     enabled: !!props.bookId,
  //   },
  // );

  // 임시 query 책 정보
  // const { data: bookInfo } = useQuery(
  //   ["getBook", props.bookTitle],
  //   () => getAllBooks({ page: 1, size: 1, title: props.bookTitle }),
  //   { enabled: !!props.bookTitle },
  // );

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 4,
        py: 2,
        "&:nth-of-type(odd)": {
          backgroundColor: "primary.light",
        },
      }}
    >
      {props.planInfo && (
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <CommonTypography
            value={props.planInfo.title}
            variant="body1"
            bold={true}
          />
          <CommonTypography
            value={props.planInfo.author}
            variant="body1"
            bold={false}
          />
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "end", md: "center" },
        }}
      >
        {/* 임시 */}
        {props.planInfo && (
          <CommonButton
            value="✔선택하기"
            outline={false}
            onClick={() => {
              props.handleSelectPlan(props.planInfo);
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default WritePostBookItem;
