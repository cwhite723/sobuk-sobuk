import { Box, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CommonButton from "./CommonButton";

const CommonSearchBar = () => {
  const handleSearch = () => {
    console.log("검색");
  };
  return (
    <Box sx={{ display: "flex", alignItems: "center", m: 2 }}>
      {/* 검색 아이콘 */}
      <Box
        sx={{
          p: 1,
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SearchIcon />
      </Box>

      {/* 검색창 테두리 */}
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
        {/* 검색창 */}
        <InputBase
          sx={{
            width: "100%",
            ml: 2,
            "&:focus": {
              backgroundColor: "text.secondary",
            },
          }}
          placeholder="검색어를 입력하세요"
        />
      </Box>

      {/* 검색버튼 */}
      <CommonButton value="검색" outline={false} onClick={handleSearch} />
    </Box>
  );
};

export default CommonSearchBar;
