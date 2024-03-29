import { Box } from "@mui/material";
import SmallButton from "components/atoms/SmallButton";
import { textByCardStatus } from "constants/texts";
import { useNavigate } from "react-router-dom";

interface PropsType {
  status: "completed" | "not_created_post";
}

const ProgressCover = ({ status }: PropsType) => {
  // 네비게이트
  const navigate = useNavigate();

  // 상태값에 따른 버튼 내용 변경
  const handleCardStatus = () => {
    if (status === "completed") {
      // 추후 completed 상태에 대한 처리 - 보관 처리 등
      return;
    }
    if (status === "not_created_post") {
      navigate("../write");
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
      <SmallButton
        buttonText={textByCardStatus[status]}
        outline={true}
        handleClickEvent={handleCardStatus}
      />
    </Box>
  );
};
export default ProgressCover;
