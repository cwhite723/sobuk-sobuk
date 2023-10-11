import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import theme from "styles/theme";

interface PropsType {
  children?: React.ReactNode;
  id?: string;
  label?: string;
  defaultValue?: string;
  type?: "password";
}

const CommonTextField: React.FC<PropsType> = (props) => {
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
      type={props.type ?? "password"}
      id={props.id}
      label={props.label}
      defaultValue={props.defaultValue}
    />
  );
};

export default CommonTextField;
