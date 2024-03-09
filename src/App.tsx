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
import { collection, getDocs } from "firebase/firestore";
import { db } from './firebase';

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  useEffect(() => {

    const fecheTransactions = async() => {
      try {
        const querySnapshot = await getDocs(collection(db, "Transactions"));
        console.log(querySnapshot);

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
        // error
      }
    }
    fecheTransactions();

  },[])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path='/' element={<AppLayout />} >
            <Route index element={<Home />} />
            <Route path="/report" element={<Report />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
