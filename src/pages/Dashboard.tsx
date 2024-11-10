import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import Products from "../components/Products";

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ width: "100%", marginTop: "20px" }}>
      <h1>Dashboard</h1>
      <Tabs value={selectedTab} onChange={handleTabChange} centered>
        <Tab label="Products" />
        <Tab label="Orders" />
      </Tabs>
      {selectedTab === 0 && <Products />}
      {selectedTab === 1 && <Box p={3}>Manage Orders Here</Box>}
    </Box>
  );
};

export default Dashboard;
