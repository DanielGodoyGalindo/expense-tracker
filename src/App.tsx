import './App.css'
import { useState, useEffect } from 'react';
import type { Transaction } from './types/transaction';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList'
import Balance from './components/Balance';
import OneLevelPieChart from './components/BalanceChart';

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

  const deleteTransaction = (id: string) => {
    setTransactions((prev) =>
      prev.filter((transaction) => transaction.id !== id)
    );
  };

  return (
    <div className="flex flex-col gap-8 p-4 min-h-screen">

      <h1 className="text-6xl text-center">Expense Tracker</h1>

      <div className="flex w-full justify-center gap-8">

        <div className="flex flex-col w-1/3 p-4 rounded-lg gap-12 justify-center">
          <TransactionForm onAddTransaction={addTransaction} />
          <Balance transactions={transactions} />
          <OneLevelPieChart transactions={transactions} />
        </div>

        <div className="w-1/3 rounded-lg">
          <TransactionList
            transactions={transactions}
            onDeleteTransaction={deleteTransaction}
          />
        </div>

      </div>
    </div>
  );
}

export default App
