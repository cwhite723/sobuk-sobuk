import { Box } from "@mui/material";
import CustomTypography from "components/atoms/CustomTypography";

interface PropsType {
  children: React.ReactNode;
  maxHight?: number;
  text?: string;
}

// 컨텐츠 구역을 나누기 위한 컴포넌트
const Section = ({ children, maxHight, text }: PropsType) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        maxHeight: maxHight || "100%",
        overflowY: "auto",
        "::-webkit-scrollbar": {
          display: "none",
        },
        backgroundColor: "primary.main",
        boxShadow: "0px 0px 5px rgba(0,0,0,0.5)",
        borderRadius: 5,
        mt: { xs: 4, md: 6 },
        p: 4,
      }}
    >
      {text && (
        <Box
          sx={{
            display: "flex",
            alignItems: "end",
            mb: 2,
          }}
        >
          <CustomTypography text={text} bold={true} variant="h5" />
        </Box>
      )}
      {children}
    </Box>
  );
};
export default Section;
