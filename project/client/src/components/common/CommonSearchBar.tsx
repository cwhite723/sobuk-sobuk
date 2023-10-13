import { Box, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CommonButton from "./CommonButton";

const CommonSearchBar = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", m: 2 }}>
      <Box
        sx={{
          p: 1,
          height: "100%",
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SearchIcon />
      </Box>
      <Box
        sx={{
          position: "flex",
          flexGrow: 1,
          borderRadius: 3,
          border: "1px solid",
          backgroundColor: "background.default",
          width: "100%",
          p: 1,
          mr: 2,
        }}
      >
        <InputBase
          sx={{
            color: "inherit",
            width: "100%",
            ml: 2,
            "&:focus": {
              backgroundColor: "text.secondary",
            },
          }}
          placeholder="검색어를 입력하세요"
        />
      </Box>
      <CommonButton value="검색" />
    </Box>
  );
};

export default CommonSearchBar;
