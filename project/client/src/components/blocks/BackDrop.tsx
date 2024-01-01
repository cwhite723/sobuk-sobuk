import { Backdrop, CircularProgress } from "@mui/material";
import { useIsFetching } from "react-query";

const BackDrop = () => {
  // Fetching 상태에 있는 쿼리를 반환
  const isFetching = useIsFetching();

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={!!isFetching}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default BackDrop;
