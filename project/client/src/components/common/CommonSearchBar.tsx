import { Box, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDebounce } from "hooks/useDebounce";
import { useEffect, useState } from "react";

interface PropsType {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const CommonSearchBar = (props: PropsType) => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 1500);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    props.setSearchQuery(debouncedValue);
  }, [debouncedValue]);

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
          type="text"
          onChange={handleChange}
        />
      </Box>
    </Box>
  );
};

export default CommonSearchBar;
