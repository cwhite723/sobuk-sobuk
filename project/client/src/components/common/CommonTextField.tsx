import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import theme from "styles/theme";

const CommonTextField: React.FC<{
  id: string;
  label: string;
  defaultValue: string;
}> = (props) => {
  const StyledTextField = styled(TextField)`
    margin-top: 25px;
    & label {
      color: ${theme.palette.text.primary};
    }
    & label.Mui-focused {
      color: ${theme.palette.text.primary};
    }
    & .MuiOutlinedInput-root {
      & .Mui-focused fieldset {
        border-color: ${theme.palette.text.secondary};
      }
    }
  `;

  return (
    <StyledTextField
      required
      id={props.id}
      label={props.label}
      defaultValue={props.defaultValue}
    />
  );
};

export default CommonTextField;
