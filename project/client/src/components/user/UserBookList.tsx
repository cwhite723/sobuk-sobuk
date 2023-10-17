import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import CommonBookImage from "components/common/CommonBookImage";

import CommonTitle from "components/common/CommonTitle";
import CommonTypography from "components/common/CommonTypography";

interface PropsType {
  userName: string;
  userBookCount: number;
}

const UserBookList: React.FC<PropsType> = (props) => {
  return (
    <Box>
      {/* tabmenu 서재 title */}
      <Box
        sx={{
          display: "flex",
          pt: 2,
          mt: 2,
        }}
      >
        <CommonTitle
          value={
            "📚 " +
            props.userName +
            "님의 서재에 총 " +
            props.userBookCount +
            "권의 책이 있어요"
          }
        />
      </Box>
      <Grid
        container
        columns={{ xs: 1, md: 4 }}
        sx={{
          width: "100%",
          backgroundColor: "primary.main",
          borderRadius: 5,
          border: "1px solid",
        }}
      >
        {/* 유저 서재 도서 item */}
        <Grid xs={1} md={1}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "background.default",
              borderRadius: 5,
              p: 2,
              m: 2,
            }}
          >
            <CommonBookImage width={100} height={150} />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                ml: 2,
              }}
            >
              <CommonTypography value="책 제목" variant="h6" bold={true} />
              <CommonTypography value="지은이" variant="body2" bold={false} />
              <CommonTypography value="80/100" variant="body2" bold={false} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserBookList;
