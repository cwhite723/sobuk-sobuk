import { Box } from "@mui/material";
interface PropsType {
  children: React.ReactNode;
}

const MainSection: React.FC<PropsType> = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        maxHeight: 700,
        overflowY: "auto",
        "::-webkit-scrollbar": {
          display: "none",
        },
        backgroundColor: "primary.main",
        borderRadius: 5,
        border: "1px solid",
        m: { xs: 2, md: 4 },
        p: 2,
      }}
    >
      {props.children}
    </Box>
  );
};
export default MainSection;
