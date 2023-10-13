import { Button } from "@mui/material";
import styled from "@emotion/styled";

interface PropsType {
  children?: React.ReactNode;
  value?: string;
  outline?: boolean;
}

const CommonButton: React.FC<PropsType> = (props) => {
  const StyledButton = styled(Button)`
    display: block;
    border-radius: 20px;
  `;
  return (
    <StyledButton
      sx={
        props.outline
          ? {
              color: "text.primary",
              border: "1px solid",
              borderColor: "text.primary",
              backgroundColor: "primary.main",
              "&:hover": {
                backgroundColor: "background.default",
              },
            }
          : {
              color: "text.secondary",
              backgroundColor: "text.primary",
            }
      }
      variant={props.outline ? "outlined" : "contained"}
    >
      {props.value}
    </StyledButton>
  );
};
export default CommonButton;
