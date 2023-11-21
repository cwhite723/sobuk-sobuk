import { Box, Tab, Tabs } from "@mui/material";
import React from "react";

interface PropsType {
  handelTabFocus: (newSelectMenu: TabMenuType) => void;
  nowTab: TabMenuType;
  tabMenus: TabMenuType[];
}

const CommonTabMenu = (props: PropsType) => {
  return (
    <Box
      sx={{
        width: "100%",
        mb: 2,
      }}
    >
      <Tabs
        value={props.nowTab.value}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="user page tab menu"
        sx={{
          "& .MuiTab-root": {
            color: "text.primary",
          },
          "& .MuiTab-root.Mui-selected": {
            color: "text.primary",
          },
          "& .MuiTabs-indicator": {
            backgroundColor: "text.primary",
          },
        }}
      >
        {props.tabMenus.map((item, index) => (
          <Tab
            key={index}
            label={item.label}
            value={item.value}
            onFocus={() => props.handelTabFocus(item)}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default CommonTabMenu;