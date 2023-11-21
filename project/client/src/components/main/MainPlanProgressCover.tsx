import { Box } from "@mui/material";
import CommonButton from "components/common/CommonButton";
import { useNavigate } from "react-router-dom";

interface PropsType {
  status: "completed" | "not_created_post";
}

// 상태값에 따른 버튼 내용
const cardStatus = {
  completed: "😎완독하고 독서기록 까지 작성했어요!",
  not_created_post: "🎉완독했어요! 독서기록 작성하기",
};

const MainPlanProgressCover = (props: PropsType) => {
  // 네비게이트
  const navigate = useNavigate();

  // 상태값에 따른 버튼 내용 변경
  const handleCardStatus = () => {
    if (props.status === "not_created_post") {
      navigate("../write");
    } else {
      // completed 상태에 대한 처리
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: "0",
        left: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.2)",
        borderRadius: 5,
        zIndex: "1",
      }}
    >
      <CommonButton
        value={cardStatus[props.status]}
        outline={true}
        onClick={handleCardStatus}
      />
    </Box>
  );
};
export default MainPlanProgressCover;
