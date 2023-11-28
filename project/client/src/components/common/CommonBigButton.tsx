import { Button } from "@mui/material";

interface PropsType {
  buttonText: string;
  handleClickEvent: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

const CommonBigButton = ({
  buttonText,
  handleClickEvent,
  disabled,
}: PropsType) => {
  return (
    // fullWidth 속성을 가진 버튼
    // disabled true 일때 hover 스타일 변경 필요
    <Button
      fullWidth
      variant="contained"
      sx={{
        display: "block",
        backgroundColor: disabled ? "primary.light" : "text.primary",
        color: disabled ? "text.primary" : "text.secondary",
        my: 1,
      }}
      onClick={handleClickEvent}
    >
      {buttonText}
    </Button>
  );
};
export default CommonBigButton;
