import './App.css'
import { useState, useEffect } from 'react';
import type { Transaction } from './types/transaction';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList'
import Balance from './components/Balance';
import OneLevelPieChart from './components/BalanceChart';
import Modal from './components/Modal';
import Budget from './components/Budget';
import { filterTransactions, sortTransactions } from './utils/transactionUtils'
import type { Category, SortBy, SortOrder } from "./types/filters";
import MonthlyBarChart from './components/MonthlyBarChart';

function App() {

  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(String(today.getMonth() + 1).padStart(2, "0"));
  const [selectedYear, setSelectedYear] = useState(String(today.getFullYear()));
  const [selectedCategory, setSelectedCategory] = useState<Category>("Both");
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [searchTitle, setSearchTitle] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [transactionToDelete, setTransactionToDelete] = useState<Transaction | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [budgets, setBudgets] = useState<Record<string, number>>(() => {
    const storedBudgets = localStorage.getItem("budgets");
    return storedBudgets ? JSON.parse(storedBudgets) : {};
  });
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem("darkMode");
    return stored === "true";
  });

  // Execute just once when mounting component
  const [transactions, setTransactions] = useState<Transaction[]>(() => { // {"2026-07": 1000}
    const stored = localStorage.getItem("transactions");
    return stored ? JSON.parse(stored) : [];
  });

  // Everytime 'transactions' changes
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // Set budgets to localStorage
  useEffect(() => {
    localStorage.setItem("budgets", JSON.stringify(budgets));
  }, [budgets]);

  // Set dark mode to localStorage
  useEffect(() => {
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  // Show message when action is done
  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setShowSuccessMessage(true);

    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);

    setTimeout(() => {
      setSuccessMessage("");
    }, 3500);
  };

  // Add transaction inside form
  const addTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [...prev, transaction]);
    showSuccess("Transaction added successfully!");
  };

  // Delete transaction
  const deleteTransaction = (id: string) => {
    setTransactions((prev) =>
      prev.filter((transaction) => transaction.id !== id)
    );
    showSuccess("Transaction deleted successfully!");
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
    showSuccess("Transaction updated successfully!");
  };

  const filteredTransactions = filterTransactions(transactions, selectedYear, selectedMonth, selectedCategory, searchTitle);
  const sortedTransactions = sortTransactions(filteredTransactions, sortBy, sortOrder);

  const totalExpenses = filteredTransactions
    .filter((transaction) => transaction.category === "Expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const onRequestDelete = (transaction: Transaction) => {
    setTransactionToDelete(transaction);
  };

  const budgetKey = `${selectedYear}-${selectedMonth}`;
  const currentBudget = budgets[budgetKey] ?? 0;

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white">

        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="bg-indigo-600 hover:bg-indigo-800 text-white text-lg w-10 h-10 rounded-full cursor-pointer shadow-lg"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}>
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

        <div className="flex flex-col gap-8 p-4 min-h-screen">

          <h1 className="text-5xl font-bold text-center text-indigo-700 dark:text-indigo-400 tracking-tight mb-4">Expense Tracker</h1>

          {/* Success message when user does an action (create, update or delete a transaction)*/}
          {successMessage && (
            <div
              className={`
            fixed top-5 right-5 z-50
          bg-green-100 border border-green-400 text-green-700
            px-4 py-3 rounded-lg shadow-lg
            transition-transform duration-500 ease-in-out
            ${showSuccessMessage ? "translate-x-0" : "translate-x-[120%]"}`}>
              ✓ {successMessage}
            </div>
          )}

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

            <div className="w-2/5 rounded-lg flex flex-col items-center gap-y-16">
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

              <Budget
                budget={currentBudget}
                expenses={totalExpenses}
                onSetBudget={(amount) => {
                  setBudgets((prev) => ({
                    ...prev,
                    [budgetKey]: amount,
                  }));
                }}
              />
            </div>

          </div>

          <MonthlyBarChart transactions={transactions} selectedYear={selectedYear} />

          <footer className='self-center'>
            Made by <a href='https://github.com/DanielGodoyGalindo/expense-tracker' className='cursor-pointer; text-indigo-600 dark:text-indigo-400 hover:underline font-bold' target='_blank'>Daniel Godoy</a>
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
      </div>
    </div >
  );
}

export default App
