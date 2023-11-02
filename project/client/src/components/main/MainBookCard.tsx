import { Box } from "@mui/material";
import CommonBookImage from "components/common/CommonBookImage";
import CommonTypography from "components/common/CommonTypography";

interface PropsType {
  bookItem: BookItem;
}

const MainBookCard = (props: PropsType) => {
  const getStringDate = (dates: Date[]) => {
    const stringDate: string[] = [];
    for (let i = 0; i < dates.length; i++) {
      stringDate[i] = dates[i].toLocaleString();
      stringDate[i] = stringDate[i]
        .split(".", 3)
        .join("-")
        .replace(/(\s*)/g, "");
    }
    return stringDate;
  };

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
      <CommonBookImage width={100} height={150} />
      <Box sx={{ display: "flex" }}>
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
      </Box>
      {props.bookItem.bookDate && props.bookItem.bookState === "before" && (
        <CommonTypography
          value={
            getStringDate(props.bookItem.bookDate)[0] + "부터 읽을 예정이에요"
          }
          variant="body1"
          bold={true}
        />
      )}
    </Box>
  );
};

export default MainBookCard;
