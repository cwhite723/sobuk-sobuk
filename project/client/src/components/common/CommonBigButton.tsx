import { Button } from "@mui/material";
import styled from "@emotion/styled";
import theme from "styles/theme";

interface PropsType {
  children?: React.ReactNode;
  value?: string;
}

const CommonBigButton: React.FC<PropsType> = (props) => {
  const StyledButton = styled(Button)`
    display: block;
    max-width: "500px";
    background-color: ${theme.palette.text.primary};
    color: ${theme.palette.text.secondary};
  `;
  return (
    <StyledButton fullWidth variant="contained">
      {props.value}
    </StyledButton>
  );
};
export default CommonBigButton;
