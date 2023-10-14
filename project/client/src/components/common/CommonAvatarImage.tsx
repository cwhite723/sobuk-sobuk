import styled from "@emotion/styled";
import { Avatar } from "@mui/material";
import theme from "styles/theme";

interface PropsType {
  children?: React.ReactNode;
  src?: string;
  size?: number;
}

const CommonAvaratImage: React.FC<PropsType> = (props) => {
  const StyledAvatar = styled(Avatar)`
    width: ${props.size}px;
    height: ${props.size}px;
    background-color: ${theme.palette.text.primary};
  `;

  return <StyledAvatar src={props.src} />;
};
export default CommonAvaratImage;
