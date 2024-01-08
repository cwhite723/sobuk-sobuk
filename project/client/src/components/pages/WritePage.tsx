import { Box } from "@mui/material";
import CustomTypography from "components/atoms/CustomTypography";
import BookItems from "components/blocks/write/BookItems";
import PostForm from "components/blocks/write/PostForm";
import { usePlansQuery } from "hooks/queries/usePlanQueries";
import { useState } from "react";
import { getStoredToken } from "utils/get";

const WritePage = () => {
  // redux에 저장된 토큰 가져오기
  const memberToken = getStoredToken();

  // plan 기반으로 post를 작성하기 때문에 planInfo가 있어야 함
  const [selectPlan, setSelectPlan] = useState<PlanInfo | null>(null);

  // 선택된 플랜을 컨트롤 하는 함수
  const handleSelectPlan = (planInfo: PlanInfo) => {
    setSelectPlan(planInfo);
  };

  // react-query GET plans
  const { data: notCreatedPostPlan } = usePlansQuery(
    "NOT_CREATED_POST",
    memberToken,
    { enabled: !!memberToken },
  );

  // 선택된 플랜 초기화 함수
  const handleChangePlan = () => {
    setSelectPlan(null);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        py: { xs: 4, md: 6 },
        px: { xs: 2, md: 4 },
        mt: 4,
      }}
    >
      <CustomTypography text="독서기록 작성하기" variant="h5" bold={true} />
      <CustomTypography
        text="먼저 완독 도서 리스트 중 기록을 작성할 도서를 선택해주세요"
        variant="body2"
        bold={true}
      />

      {notCreatedPostPlan?.data.length === 0 && (
        <Box sx={{ m: 5 }}>
          <CustomTypography
            text="완독 도서가 없어요😥"
            variant="body1"
            bold={true}
          />
        </Box>
      )}

      {/* 완독 도서 리스트 */}
      {selectPlan === null && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            boxShadow: "0px 0px 5px rgba(0,0,0,0.5)",
            borderRadius: 3,
            backgroundColor: "primary.main",
            mt: 2,
            overflowY: "auto",
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {/* 도서 아이템 */}
          {notCreatedPostPlan &&
            notCreatedPostPlan.data.map((planInfo) => (
              <BookItems
                key={planInfo.planId}
                handleSelectPlan={handleSelectPlan}
                planInfo={planInfo}
              />
            ))}
        </Box>
      )}

      {/* 독서기록 작성 폼 */}
      {selectPlan && (
        <PostForm handleChangePlan={handleChangePlan} planInfo={selectPlan} />
      )}
    </Box>
  );
};

export default WritePage;
