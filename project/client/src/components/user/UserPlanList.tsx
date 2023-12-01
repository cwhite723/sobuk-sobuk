import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import CommonBookImage from "components/common/CommonBookImage";
import CommonTitle from "components/common/CommonTitle";
import CommonTypography from "components/common/CommonTypography";
import useMemberPlansQuery from "hooks/queries/members/useMemberPlansQuery";
import useMyPlansQuery from "hooks/queries/members/useMyPlansQuery";
import { useEffect, useState } from "react";
import { getStoredToken } from "utils/get";

interface PropsType {
  memberInfo: MemberInfo | OtherMemberInfo;
  memberId: number | null;
  isMyPage: boolean;
  isPreview: boolean;
}

const UserPlanList = ({
  memberInfo,
  memberId,
  isMyPage,
  isPreview,
}: PropsType) => {
  const memberToken = getStoredToken();

  // 데이터 요청에 필요한 params
  // 무한 스크롤 구현 필요
  const [params, setParams] = useState<MemberPostsAndBooksParams>({
    id: null,
    size: isPreview ? 3 : 10,
  });

  // 받아온 데이터
  const [memberPlans, setMemberPlans] = useState<MemberPlansInfo[] | null>(
    null,
  );

  // react-query - GET my plans
  const { data: myPlansData, isSuccess: isMyPlansSuccess } = useMyPlansQuery(
    params,
    memberToken,
    {
      enabled: !!memberToken && !!params && isMyPage,
    },
  );

  // react-query - GET member plans
  const { data: memberPlansData, isSuccess: isMemberPlansSuccess } =
    useMemberPlansQuery(params, memberToken, memberId, {
      enabled: !!memberToken && !!params && !!memberId,
    });

  useEffect(() => {
    if (isMyPage && isMyPlansSuccess) {
      setMemberPlans(myPlansData.data.data);
    }
    if (memberId && isMemberPlansSuccess) {
      setMemberPlans(memberPlansData.data.data);
    }
  }, [isMyPlansSuccess, isMemberPlansSuccess]);

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
          text={
            "📚 " +
            memberInfo.nickname +
            "님의 서재에 총 " +
            memberInfo.countBookMark +
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
        {memberPlans &&
          memberPlans.map((planItem) => (
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
                <CommonBookImage
                  width={100}
                  height={150}
                  src={planItem.imageUrl}
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
                    text={planItem.title}
                    variant="h6"
                    bold={true}
                  />
                  <CommonTypography
                    text={planItem.author}
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
