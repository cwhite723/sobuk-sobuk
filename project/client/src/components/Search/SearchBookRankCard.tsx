import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import CommonBookImage from "components/common/CommonBookImage";
import CommonTypography from "components/common/CommonTypography";

interface PropsType {
  bookItem: BookItem;
}

const SearchBookRankCard: React.FC<PropsType> = (props) => {
  return (
    <Grid xs="auto" md={5} sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "left",
          backgroundColor: "background.default",
          boxShadow: "0px 0px 5px rgba(0,0,0,0.3)",
          borderRadius: 5,
          p: 2,
          m: 1,
        }}
      >
        <CommonBookImage
          width={100}
          height={150}
          src={props.bookItem.bookImg}
        />

        <Box sx={{ ml: 2, borderTop: "1px solid" }}>
          <CommonTypography
            value={props.bookItem.bookName}
            variant="h6"
            bold={true}
          />
          <CommonTypography
            value={props.bookItem.bookWriter}
            variant="body2"
            bold={false}
          />
          <CommonTypography
            value={
              props.bookItem.bookIntroduction
                ? props.bookItem.bookIntroduction
                : "한줄 소개가 없어요"
            }
            variant="body2"
            bold={false}
          />
        </Box>
      </Box>
    </Grid>
  );
};

export default SearchBookRankCard;
