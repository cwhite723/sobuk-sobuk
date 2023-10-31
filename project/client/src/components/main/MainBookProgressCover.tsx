import { Box } from "@mui/material";
import CommonButton from "components/common/CommonButton";
import { useNavigate } from "react-router-dom";

interface PropsType {
  state: "nonMember" | "complete" | "error";
}

// 상태값에 따른 버튼 내용
const cardState = {
  nonMember: "🤝로그인하고 독서기록 작성하기",
  complete: "🎉완독했어요! 독서기록 작성하기",
  error: "Error",
};

const MainBookProgressCover: React.FC<PropsType> = (props) => {
  // 네비게이트
  const navigate = useNavigate();

  // 상태값에 따른 버튼 내용 변경
  const handleCardStatus = () => {
    if (props.state === "nonMember") {
      navigate("../login");
    } else if (props.state === "complete") {
      navigate("../write");
    } else {
      navigate("../error");
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
        backdropFilter: props.state === "nonMember" ? "blur(3px)" : "blur(0px)",
        borderRadius: 5,
        zIndex: "1",
      }}
    >
      <CommonButton
        value={cardState[props.state]}
        outline={true}
        onClick={handleCardStatus}
      />
    </Box>
  );
};
export default MainBookProgressCover;
