import { useState, useEffect } from 'react';
import './App.css'
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList'
import type { Transaction } from './types/transaction';

function App() {

  // Execute just once when mounting component
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const stored = localStorage.getItem("transactions");
    return stored ? JSON.parse(stored) : [];
  });

  // Everytime 'transactions' changes
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // Add transaction inside form
  const addTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [...prev, transaction]);
  };

  return (
    <>
      <TransactionForm onAddTransaction={addTransaction} />
      <TransactionList transactions={transactions} />
    </>
  )
}

export default App
