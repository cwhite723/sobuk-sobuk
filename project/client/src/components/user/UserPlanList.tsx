import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import CommonBookImage from "components/common/CommonBookImage";

import CommonTitle from "components/common/CommonTitle";
import CommonTypography from "components/common/CommonTypography";

interface PropsType {
  memberInfo: MemberInfo | OtherMemberInfo;
  planList: MemberPlansInfo[];
  isPreview: boolean;
}

const UserPlanList = (props: PropsType) => {
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
            props.memberInfo.nickname +
            "님의 서재에 총 " +
            props.memberInfo.countBookMark +
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
        {/* 유저 서재 도서, Plans item */}
        {props.planList
          .filter((planItem, index) => (props.isPreview ? index < 3 : planItem))
          .map((planItem) => (
            <Grid xs={1} md={1} key={planItem.readingPlanId}>
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
                {/* 이미지 나중에 수정 */}
                <CommonBookImage width={100} height={150} />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    ml: 2,
                  }}
                >
                  <CommonTypography
                    value={planItem.title}
                    variant="h6"
                    bold={true}
                  />
                  <CommonTypography
                    value={planItem.author}
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

export default UserPlanList;
