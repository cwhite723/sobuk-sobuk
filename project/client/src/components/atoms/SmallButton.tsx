import { Button } from "@mui/material";

interface PropsType {
  buttonText: string;
  outline: boolean;
  handleClickEvent: React.MouseEventHandler<HTMLButtonElement>;
}

const SmallButton = ({ buttonText, outline, handleClickEvent }: PropsType) => {
  return (
    <Button
      // outline prop에 따라 버튼 스타일 변경
      sx={
        outline
          ? {
              whiteSpace: "nowrap",
              borderRadius: 20,
              m: 1,
              color: "text.primary",
              border: "1px solid",
              borderColor: "text.primary",
              backgroundColor: "primary.main",
              "&:hover": {
                backgroundColor: "background.default",
              },
            }
          : {
              whiteSpace: "nowrap",
              borderRadius: 20,
              m: 1,
              color: "text.secondary",
              backgroundColor: "text.primary",
            }
      }
      variant={outline ? "outlined" : "contained"}
      onClick={handleClickEvent}
    >
      {buttonText}
    </Button>
  );
};
export default SmallButton;
