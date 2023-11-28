import { Box, Button } from "@mui/material";

interface PropsType {
  buttonText: string;
  outline: boolean;
  handleClickEvent: React.MouseEventHandler<HTMLButtonElement>;
}

const CommonButton = ({ buttonText, outline, handleClickEvent }: PropsType) => {
  return (
    <Box>
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
    </Box>
  );
};
export default CommonButton;
