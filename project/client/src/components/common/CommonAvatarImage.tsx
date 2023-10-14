import { Avatar } from "@mui/material";

interface PropsType {
  src?: string;
  size: number;
}

const CommonAvaratImage: React.FC<PropsType> = (props) => {
  return (
    // user 프로필 사진을 위한 AvatarImg 컴포넌트
    <Avatar
      src={props.src}
      sx={{
        width: props.size,
        height: props.size,
        backgroundColor: "text.primary",
      }}
    />
  );
};
export default CommonAvaratImage;
