import { Button } from "@mui/material";

interface PropsType {
  value: string;
}

const CommonBigButton: React.FC<PropsType> = (props) => {
<<<<<<< HEAD
  const StyledButton = styled(Button)`
    display: block;
    margin-top: 25px;
    padding: 10px 0 10px 0;
    max-width: 500px;
    background-color: ${theme.palette.text.primary};
    color: ${theme.palette.text.secondary};
  `;
=======
>>>>>>> fe/common
  return (
    // 기본 버튼보다 큰 버전
    <Button
      fullWidth
      variant="contained"
      sx={{
        display: "block",
        maxWidth: 500,
        backgroundColor: "text.primary",
        color: "text.secondary",
      }}
    >
      {props.value}
    </Button>
  );
};
export default CommonBigButton;
