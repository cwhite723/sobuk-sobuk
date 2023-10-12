import styled from "@emotion/styled";
import { Typography } from "@mui/material";

interface PropsType {
  value: string;
  variant: "h5" | "h6" | "body1" | "body2";
  bold: boolean;
}

const CommonTypography: React.FC<PropsType> = (props) => {
  const StyledTitleTypography = styled(Typography)`
    font-weight: ${props.bold ? "800" : "400"};
  `;
  return (
    <StyledTitleTypography variant={props.variant}>
      {props.value}
    </StyledTitleTypography>
  );
};
export default CommonTypography;
