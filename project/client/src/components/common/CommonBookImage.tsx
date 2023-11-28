import { Box } from "@mui/material";

interface PropsType {
  // member쪽 image response 값 수정하면 undefined 빼야함
  src: string | null | undefined;
  width: number;
  height: number;
}

// 도서 이미지 컴포넌트
const CommonBookImage = ({ src, width, height }: PropsType) => {
  return (
    <Box
      component="img"
      sx={{
        width,
        height,
        m: 2,
        backgroundImage: `url(${src})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundColor: "text.primary",
      }}
    />
  );
};

export default CommonBookImage;
