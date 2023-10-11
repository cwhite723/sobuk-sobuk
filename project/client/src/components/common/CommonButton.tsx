import { Button } from "@mui/material";

interface PropsType {
  children?: React.ReactNode;
  value?: string;
  outline?: boolean;
}

const CommonButton: React.FC<PropsType> = (props) => {
  return (
    <Button
      sx={
        props.outline
          ? {
              color: "text.primary",
              border: "1px solid",
              borderColor: "text.primary",
              display: "block",
              borderRadius: "20px",
            }
          : {
              color: "text.secondary",
              backgroundColor: "text.primary",
              display: "block",
              borderRadius: "20px",
            }
      }
      variant={props.outline ? "outlined" : "contained"}
    >
      {props.value}
    </Button>
  );
};
export default CommonButton;
