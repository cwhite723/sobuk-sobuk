import { FormHelperText } from "@mui/material";

interface PropsType {
  text: string | undefined;
  status?: "error" | "success";
}

const CommonFormHelperText = ({ text, status = "error" }: PropsType) => {
  return (
    <FormHelperText
      sx={{
        color: status === "error" ? "error.main" : "text.primary",
        fontWeight: "800",
      }}
    >
      {text}
    </FormHelperText>
  );
};

export default CommonFormHelperText;
