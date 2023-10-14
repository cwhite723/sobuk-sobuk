import { Button } from "@mui/material";

interface PropsType {
  value: string;
}

const CommonBigButton: React.FC<PropsType> = (props) => {
  return (
    // 기본 버튼보다 큰 버전
    <Button
      fullWidth
      variant="contained"
      sx={{
        display: "block",
        maxWidth: 500,
        backgroundColor: "text.primary",
        color: "text.secondary",
        mt: 2,
      }}
    >
      {props.value}
    </Button>
  );
};
export default CommonBigButton;
