import { TextField } from "@mui/material";

interface PropsType {
  id: string;
  label: string;
  placeholder?: string;
  type: "password" | "required" | "number" | "email" | "date";
}

const CommonTextField: React.FC<PropsType> = (props) => {
  return (
    <TextField
      fullWidth
      type={props.type}
      id={props.id}
      label={props.label}
      placeholder={props.placeholder}
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
