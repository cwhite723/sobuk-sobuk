import { Box, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CommonButton from "./CommonButton";

const CommonSearchBar = () => {
  // 검색 버튼 함수
  const handleSearch = () => {
    console.log("검색");
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: 4, mt: 2 }}>
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
          boxShadow: "0px 0px 5px rgba(0,0,0,0.5)",
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
