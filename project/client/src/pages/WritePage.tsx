import { Box } from "@mui/material";
import { getPlans } from "apis/plans";
import CommonTitle from "components/common/CommonTitle";
import CommonTypography from "components/common/CommonTypography";
import WritePostBookItem from "components/write/WritePostBookItem";
import WritePostForm from "components/write/WritePostForm";
import { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

const WritePage = () => {
  // redux에 저장된 토큰 가져오기
  const token = useSelector((state: RootState) => state.auth.token);

  // 선택된 책 - 수정 전
  // const [selectBookId, setSelectBookId] = useState<number | null>(null);

  // plan 기반으로 post를 작성하기 때문에 bookId가 아니라 planInfo가 있어야 함
  const [selectPlan, setSelectPlan] = useState<PlanInfo | null>(null);

  // 선택된 책을 컨트롤 하는 함수
  // const handleSelectBook = (bookId: number) => {
  //   setSelectBookId(bookId);
  // };

  // 선택된 플랜을 컨트롤 하는 함수
  const handleSelectPlan = (planInfo: PlanInfo) => {
    setSelectPlan(planInfo);
  };

  const { data: notCreatedPostPlans } = useQuery(
    ["getPlans", { status: "NOT_CREATED_POST", token }],
    () => getPlans("NOT_CREATED_POST", token),
    {
      enabled: !!token,
      retry: false,
    },
  );

  // 선택된 책 초기화 함수
  // const handleChangeBook = () => {
  //   setSelectBookId(null);
  // };

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
      <CommonTitle value="독서기록 작성하기" />
      <CommonTypography
        value="먼저 완독 도서 리스트 중 기록을 작성할 도서를 선택해주세요"
        variant="body2"
        bold={true}
      />
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
          {notCreatedPostPlans &&
            notCreatedPostPlans.data.map((planInfo) => (
              <WritePostBookItem
                key={planInfo.planId}
                handleSelectPlan={handleSelectPlan}
                // bookId={planInfo.bookId}
                planInfo={planInfo}
              />
            ))}
        </Box>
      )}
      {/* 독서기록 작성 폼 */}
      {selectPlan && (
        <WritePostForm
          handleChangePlan={handleChangePlan}
          planInfo={selectPlan}
        />
      )}
    </Box>
  );
};

export default WritePage;
