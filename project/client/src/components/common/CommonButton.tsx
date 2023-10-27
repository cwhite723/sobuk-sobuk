import { Box, Button } from "@mui/material";

interface PropsType {
  value: string;
  outline: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const CommonButton: React.FC<PropsType> = (props) => {
  return (
    <Box>
      <Button
        // outline prop에 따라 버튼 스타일 변경
        sx={
          props.outline
            ? {
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
                borderRadius: 20,
                m: 1,
                color: "text.secondary",
                backgroundColor: "text.primary",
              }
        }
        variant={props.outline ? "outlined" : "contained"}
        onClick={props.onClick}
      >
        {props.value}
      </Button>
    </Box>
  );
};
export default CommonButton;
