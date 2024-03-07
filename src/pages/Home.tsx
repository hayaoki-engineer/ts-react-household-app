import { Box } from "@mui/material";
import React from "react";
import MonthlySummary from "../components/MonthlySummary";
import Calender from "../components/Calender";
import TransactionForm from "../components/TransactionForm";
import TransactionMenu from "../components/TransactionMenu";

const Home = () => {
  return (
    <Box sx={{display: "flex"}}>
      {/* 左側コンテンツ */}
      <Box sx={{ flexGrow: 1 }}>
        <MonthlySummary />
        <Calender />
      </Box>

      {/* 左側コンテンツ */}
      <Box>
        <TransactionMenu />
        <TransactionForm />
      </Box>
    </Box>
  );
};

export default Home;
