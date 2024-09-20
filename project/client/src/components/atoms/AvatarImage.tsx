import { Avatar } from "@mui/material";

interface PropsType {
  src?: string | undefined | null;
  size: number;
}

// member 프로필 사진을 위한 AvatarImg 컴포넌트
const AvaratImage = ({ src, size }: PropsType) => {
  return (
    // src 값이 undefined나 null이면 기본 아이콘이 표출됨
    <Avatar
      src={src ?? ""}
      sx={{
        width: size,
        height: size,
        backgroundColor: "text.primary",
      }}
    />
  );
};
export default AvaratImage;
