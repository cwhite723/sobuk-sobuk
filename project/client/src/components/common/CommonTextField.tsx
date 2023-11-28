import { TextField } from "@mui/material";
import {
  useController,
  FieldValues,
  FieldPath,
  UseControllerProps,
} from "react-hook-form";
import { TextFieldProps } from "@mui/material";

interface MuiProps {
  textFieldProps?: TextFieldProps;
}

// useController를 사용한 공통 텍스트 필드
const CommonTextField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  textFieldProps,
  ...props
}: MuiProps & UseControllerProps<TFieldValues, TName>) => {
  const { field } = useController(props);

  return (
    <TextField
      fullWidth
      {...textFieldProps}
      {...field}
      // MUI TextField 커스터마이징
      sx={{
        my: "10px",
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
