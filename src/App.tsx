import { useState } from 'react';
import './App.css'
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList'
import type { Transaction } from './types/transaction';

function App() {

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      title: "Salary",
      amount: 2500,
      category: "payroll",
      date: "2026-07-01",
    },
  ]);

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
