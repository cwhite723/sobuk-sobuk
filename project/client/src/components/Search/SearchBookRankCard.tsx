import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import CommonBookImage from "components/common/CommonBookImage";
import CommonTypography from "components/common/CommonTypography";

interface PropsType {
  bookItem: BookInfoSimple;
}

const SearchBookRankCard = ({ bookItem }: PropsType) => {
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
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <CommonBookImage width={100} height={150} src={bookItem.imageUrl} />
        </Box>

        <Box sx={{ borderTop: "1px solid" }}>
          <CommonTypography text={bookItem.title} variant="h6" bold={true} />
          <Box sx={{ display: "flex", gap: 2 }}>
            <CommonTypography
              text={"📝" + (bookItem.author ?? "정보없음")}
              variant="body2"
              bold={false}
            />
            <CommonTypography
              text={"💼" + (bookItem.publisher ?? "정보없음")}
              variant="body2"
              bold={false}
            />
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default SearchBookRankCard;
