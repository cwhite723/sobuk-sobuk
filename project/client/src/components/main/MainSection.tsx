import styled from "@emotion/styled";
import { Box } from "@mui/material";
import theme from "styles/theme";

interface PropsType {
  children: React.ReactNode;
}

const MainSection: React.FC<PropsType> = (props) => {
  const StyledSectionBox = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: start;
    max-height: 700px;
    overflow-y: auto;
    ::-webkit-scrollbar {
      display: none;
    }
    background-color: ${theme.palette.primary.main};
    border-radius: 20px;
    border: 1px solid;
  `;

  return (
    <StyledSectionBox sx={{ m: { xs: 2, md: 4 }, p: 2 }}>
      {props.children}
    </StyledSectionBox>
  );
};
export default MainSection;
