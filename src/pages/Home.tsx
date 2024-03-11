import { Box } from "@mui/material";
import React, { useState } from "react";
import MonthlySummary from "../components/MonthlySummary";
import Calender from "../components/Calender";
import TransactionForm from "../components/TransactionForm";
import TransactionMenu from "../components/TransactionMenu";
import { Transaction } from "../types";
import { format } from "date-fns";

interface HomeProps {
  monthlyTransactions: Transaction[];
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>,
}

const Home = ({ monthlyTransactions, setCurrentMonth }: HomeProps) => {
  const today = format(new Date(), "yyyy-MM-dd");
  console.log(today)
  const [currentDay, setCurrentDay] = useState(today);
  
  const dailyTransactions = monthlyTransactions.filter((transaction) => {
    return transaction.date === currentDay
  })
  console.log(dailyTransactions)

  return (
    <Box sx={{ display: "flex" }}>
      {/* 左側コンテンツ */}
      <Box sx={{ flexGrow: 1 }}>
        <MonthlySummary monthlyTransactions={monthlyTransactions} />
        <Calender
          monthlyTransactions={monthlyTransactions}
          setCurrentMonth={setCurrentMonth}
          setCurrentDay={setCurrentDay}
        />
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
