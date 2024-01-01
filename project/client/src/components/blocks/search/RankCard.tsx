import { Box } from "@mui/material";
import Grid from "@mui/system/Unstable_Grid";
import BookImage from "components/atoms/BookImage";
import CustomTypography from "components/atoms/CustomTypography";

interface PropsType {
  bookItem: BookInfoSimple;
}

const RankCard = ({ bookItem }: PropsType) => {
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
          <BookImage width={100} height={150} src={bookItem.imageUrl} />
        </Box>

        <Box sx={{ borderTop: "1px solid" }}>
          <CustomTypography text={bookItem.title} variant="h6" bold={true} />
          <Box sx={{ display: "flex", gap: 2 }}>
            <CustomTypography
              text={"📝" + (bookItem.author ?? "정보없음")}
              variant="body2"
              bold={false}
            />
            <CustomTypography
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

export default RankCard;
