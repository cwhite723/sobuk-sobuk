import { Box, Tab, Tabs } from "@mui/material";

interface PropsType {
  handelTabFocus: (newSelectMenu: TabMenuType) => void;
  nowTab: TabMenuType;
  allTabs: TabMenuType[];
}

const TabMenu = ({ handelTabFocus, nowTab, allTabs }: PropsType) => {
  return (
    <Box
      sx={{
        width: "100%",
        mb: 2,
      }}
    >
      <Tabs
        value={nowTab.value}
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
        {allTabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            value={tab.value}
            onFocus={() => handelTabFocus(tab)}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default TabMenu;
