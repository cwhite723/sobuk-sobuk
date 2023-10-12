import styled from "@emotion/styled";
import { Box } from "@mui/material";
import theme from "styles/theme";

interface PropsType {
  children?: React.ReactNode;
  src?: string;
  width?: number;
  height?: number;
}

const CommonBookImage: React.FC<PropsType> = (props) => {
  const StyledImageBox = styled(Box)`
    width: ${props.width}px;
    height: ${props.height}px;
    margin: 5px;
    background-image: url(${props.src});
    background-size: contain;
    background-repeat: no-repeat;
    background-color: ${theme.palette.text.primary};
  `;

  return <StyledImageBox component="img" />;
};

export default CommonBookImage;
