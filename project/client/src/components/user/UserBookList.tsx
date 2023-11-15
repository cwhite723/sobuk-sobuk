import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import CommonBookImage from "components/common/CommonBookImage";

import CommonTitle from "components/common/CommonTitle";
import CommonTypography from "components/common/CommonTypography";

interface PropsType {
  nickname: string;
  userBookList: BookItem[];
  isPreview: boolean;
}

const UserBookList: React.FC<PropsType> = (props) => {
  return (
    <Box>
      {/* tabmenu 서재 title */}
      <Box
        sx={{
          display: "flex",
          pt: 4,
          mt: 2,
        }}
      >
        <CommonTitle
          value={
            "📚 " +
            props.nickname +
            "님의 서재에 총 " +
            props.userBookList.length +
            "권의 책이 있어요"
          }
        />
      </Box>
      <Grid
        container
        columns={{ xs: 1, md: 3 }}
        sx={{
          width: "100%",
          backgroundColor: "primary.main",
          borderRadius: 5,
          boxShadow: "0px 0px 5px rgba(0,0,0,0.5)",
        }}
      >
        {/* 유저 서재 도서 item */}
        {props.userBookList
          .filter((bookItem, index) => (props.isPreview ? index < 3 : bookItem))
          .map((bookItem) => (
            <Grid xs={1} md={1} key={bookItem.bookId}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "background.default",
                  borderRadius: 5,
                  boxShadow: "0px 0px 5px rgba(0,0,0,0.3)",
                  p: 2,
                  m: 4,
                }}
              >
                <CommonBookImage
                  width={100}
                  height={150}
                  src={bookItem.bookImg}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    ml: 2,
                  }}
                >
                  <CommonTypography
                    value={bookItem.bookName}
                    variant="h6"
                    bold={true}
                  />
                  <CommonTypography
                    value={bookItem.bookWriter}
                    variant="body2"
                    bold={false}
                  />
                  <CommonTypography
                    value={
                      bookItem.bookProgress
                        ? bookItem.bookProgress.toString()
                        : "진행률 없음"
                    }
                    variant="body2"
                    bold={false}
                  />
                </Box>
              </Box>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default UserBookList;
