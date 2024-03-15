import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Report from './pages/Report';
import NoMatch from './pages/NoMatch';
import AppLayout from './components/layout/AppLayout';
import {theme} from './theme/theme'
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { Transaction } from './types';
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from './firebase';
import { format } from 'date-fns';
import { formatMonth } from './utils/formatting';
import { Schema } from './validations/schema';

function App() {

  // Firestoreエラーかどうかを判定するガード
  function isFireStoreError(err: unknown):err is {code: string, message: string} {
    return typeof err === "object" && err !== null && "code" in err
  }

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // firestoreのデータを全て取得
  useEffect(() => {

    const fecheTransactions = async() => {
      try {
        const querySnapshot = await getDocs(collection(db, "Transactions"));

        const transactionsData = querySnapshot.docs.map((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());

          return {
            ...doc.data(),
            id: doc.id,
          } as Transaction
        });
        setTransactions(transactionsData)
      } catch (err) {
        if (isFireStoreError(err)) {
          console.error(err)
          console.error(err.message)
          console.error(err.code)
        } else {
          console.error("一般的なエラーは:",err)
        }
      }
    }
    fecheTransactions();

  }, [])
  
  // ひと月分のデータのみ取得
  const monthlyTransactions = transactions.filter((transaction) => {
    return transaction.date.startsWith(formatMonth(currentMonth));
  })

  // 取引を保存する処理
  const handleSaveTransaction = async (transaction: Schema) => {
    console.log(transaction)
    try {
      // firestoreにデータを保存
      const docRef = await addDoc(collection(db, "Transactions"), transaction);
      console.log("Document written with ID: ", docRef.id);

      const newTransaction = {
        id: docRef.id,
        ...transaction
      } as Transaction;
      console.log(newTransaction);
      setTransactions((prevTransacton) => [...prevTransacton, newTransaction]);
    } catch (err) {
      if (isFireStoreError(err)) {
        console.error(err);
        console.error(err.message);
        console.error(err.code);
      } else {
        console.error("一般的なエラーは:", err);
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route
              index
              element={
                <Home
                  monthlyTransactions={monthlyTransactions}
                  setCurrentMonth={setCurrentMonth}
                  onSaveTransaction={handleSaveTransaction}
                />
              }
            />
            <Route path="/report" element={<Report />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
