import { Box } from "@mui/material";
import CommonButton from "components/common/CommonButton";

interface PropsType {
  status: "nonMember" | "complete" | "error";
}

const MainBookProgressCover: React.FC<PropsType> = (props) => {
  const cardStatus = {
    nonMember: "🤝로그인하고 독서기록 작성하기",
    complete: "🎉완독했어요! 독서기록 작성하기",
    error: "Error",
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
      <CommonButton value={cardStatus[props.status]} outline={true} />
    </Box>
  );
};
export default MainBookProgressCover;
