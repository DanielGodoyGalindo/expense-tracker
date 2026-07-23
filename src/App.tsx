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

  // Delete transaction
  const deleteTransaction = (id: string) => {
    setTransactions((prev) =>
      prev.filter((transaction) => transaction.id !== id)
    );
  };

  // Update transaction
  const updateTransaction = (updatedTransaction: Transaction) => {
    setTransactions((prev) =>
      prev.map((transaction) =>
        transaction.id === updatedTransaction.id
          ? updatedTransaction
          : transaction
      )
    );

    setEditingTransaction(null);
  };

  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(String(today.getMonth() + 1).padStart(2, "0"));
  const [selectedYear, setSelectedYear] = useState(String(today.getFullYear()));
  // Filter by date
  const filteredTransactions1 = transactions.filter((transaction) => {
    const year = transaction.date.slice(0, 4);
    const month = transaction.date.slice(5, 7);
    return (
      year === selectedYear &&
      month === selectedMonth
    );
  });

  const [selectedCategory, setSelectedCategory] = useState("Expense");
  // Filter by category
  const filteredTransactions2 = filteredTransactions1.filter(transaction => {
    const category = transaction.category;
    return (category == selectedCategory);
  })

  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  return (
    <div className="flex flex-col gap-8 p-4 min-h-screen">

      <h1 className="text-5xl font-bold text-center text-indigo-700 tracking-tight mb-4">Expense Tracker</h1>

      <div className="flex w-full justify-center gap-8">

        <div className="flex flex-col w-1/3 p-4 rounded-lg gap-12 justify-center">
          <TransactionForm
            onAddTransaction={addTransaction}
            editingTransaction={editingTransaction}
            onUpdateTransaction={updateTransaction}
            onCancelEdit={() => setEditingTransaction(null)}
          />
          <Balance transactions={filteredTransactions2} selectedMonth={selectedMonth} selectedYear={selectedYear} />
          <OneLevelPieChart transactions={filteredTransactions2} />
        </div>

        <div className="w-2/5 rounded-lg">
          <TransactionList
            transactions={filteredTransactions2}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            selectedCategory={selectedCategory}
            setSelectedMonth={setSelectedMonth}
            setSelectedYear={setSelectedYear}
            onDeleteTransaction={deleteTransaction}
            setEditingTransaction={setEditingTransaction}
            setSelectedCategory={setSelectedCategory}
          />
        </div>

      </div>
    </div>
  );
}

export default App
