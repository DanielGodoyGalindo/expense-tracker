import './App.css'
import { useState, useEffect } from 'react';
import type { Transaction } from './types/transaction';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList'
import Balance from './components/Balance';
import OneLevelPieChart from './components/BalanceChart';
import Modal from './components/Modal';

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
  const [selectedCategory, setSelectedCategory] = useState("Both");
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [searchTitle, setSearchTitle] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "amount" | "title">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [transactionToDelete, setTransactionToDelete] = useState<Transaction | null>(null);

  // Filter trasactions
  const filteredTransactions = transactions
    .filter((transaction) => { // By date
      const year = transaction.date.slice(0, 4);
      const month = transaction.date.slice(5, 7);
      return (
        year === selectedYear &&
        month === selectedMonth
      );
    })
    .filter((transaction) => // By category
      selectedCategory === "Both"
        ? true
        : transaction.category === selectedCategory
    )
    .filter((transaction) => // By searching title
      transaction.title
        .toLowerCase()
        .includes(searchTitle.toLowerCase())
    );

  // Sort transactions
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    switch (sortBy) {
      case "date":
        return sortOrder === "asc"
          ? a.date.localeCompare(b.date)
          : b.date.localeCompare(a.date);
      case "amount":
        return sortOrder === "asc"
          ? a.amount - b.amount
          : b.amount - a.amount;
      case "title":
        return sortOrder === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  const onRequestDelete = (transaction: Transaction) => {
    setTransactionToDelete(transaction);
  };


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
          <Balance transactions={filteredTransactions} selectedMonth={selectedMonth} selectedYear={selectedYear} />
          <OneLevelPieChart transactions={filteredTransactions} />
        </div>

        <div className="w-2/5 rounded-lg">
          <TransactionList
            transactions={sortedTransactions}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            selectedCategory={selectedCategory}
            setSelectedMonth={setSelectedMonth}
            setSelectedYear={setSelectedYear}
            setSelectedCategory={setSelectedCategory}
            setSearchTitle={setSearchTitle}
            searchTitle={searchTitle}
            setSortBy={setSortBy}
            sortBy={sortBy}
            setSortOrder={setSortOrder}
            sortOrder={sortOrder}
            setEditingTransaction={setEditingTransaction}
            onRequestDelete={onRequestDelete}
          />
        </div>

      </div>
      <footer className='self-center'>
        Made by <a href='https://github.com/DanielGodoyGalindo/expense-tracker' className='cursor: pointer; text-indigo-700 hover:underline font-bold' target='_blank'>Daniel Godoy</a>
      </footer>

      {transactionToDelete && (
        <Modal
          title="Delete transaction?"
          message={`Are you sure you want to delete "${transactionToDelete.title}"?`}
          onCancel={() => setTransactionToDelete(null)}
          onConfirm={() => {
            deleteTransaction(transactionToDelete.id);
            setTransactionToDelete(null);
          }}
          confirmText="Delete"
          cancelText="Cancel"
        />
      )}
      
    </div>
  );
}

export default App
