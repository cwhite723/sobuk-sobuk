import { Box } from "@mui/material";

interface PropsType {
  src?: string;
  width: number;
  height: number;
}

const CommonBookImage: React.FC<PropsType> = (props) => {
  return (
    // 이미지 컴포넌트
    <Box
      component="img"
      sx={{
        width: props.width,
        height: props.height,
        m: 2,
        backgroundImage: `url(${props.src})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundColor: "text.primary",
      }}
    />
  );
};

export default CommonBookImage;
