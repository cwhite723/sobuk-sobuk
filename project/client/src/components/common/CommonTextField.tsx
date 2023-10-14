import { TextField } from "@mui/material";

interface PropsType {
  id: string;
  label: string;
  defaultValue?: string;
<<<<<<< HEAD
  type?: "password" | "required";
=======
  type?: boolean;
>>>>>>> fe/common
}

const CommonTextField: React.FC<PropsType> = (props) => {
  return (
<<<<<<< HEAD
    <StyledTextField
      type={props.type}
=======
    <TextField
      type={props.type ? "password" : "text"}
>>>>>>> fe/common
      id={props.id}
      label={props.label}
      defaultValue={props.defaultValue}
      // MUI TextField 커스터마이징
      sx={{
        mt: "25px",
        "& label": { color: "text.primary" },
        "& label.Mui-focused": {
          color: "text.primary",
        },
        "& .MuiOutlinedInput-root": {
          "& .Mui-focused fieldset": {
            borderColor: "text.secondary",
          },
        },
      }}
    />
  );
};

export default CommonTextField;
