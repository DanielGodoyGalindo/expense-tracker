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
import PeriodSelector from './components/PeriodSelector';

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

  const years = [...new Set(transactions.map((t) => t.date.slice(0, 4)))];

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">

        {/* Dark / light mode */}
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="bg-indigo-600 hover:bg-indigo-800 text-white text-lg w-10 h-10 rounded-full cursor-pointer shadow-lg"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}>
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

        <main className="max-w-6xl mx-auto px-4 py-8 space-y-10">

          <header className="text-center">
            <h1 className="text-5xl font-bold text-indigo-700 dark:text-indigo-400">
              Expense Tracker
            </h1>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Track your expenses and manage your budget
            </p>
          </header>

          <nav className="sticky top-0 z-40 text-lg flex justify-center gap-6 overflow-x-auto py-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur border-b border-gray-400 dark:border-gray-500">
            <a href="#summary" className="hover:text-indigo-600 dark:hover:text-indigo-400">Summary</a>
            <a href="#transactions" className="hover:text-indigo-600 dark:hover:text-indigo-400">Transactions</a>
            <a href="#analytics" className="hover:text-indigo-600 dark:hover:text-indigo-400">Analytics</a>
          </nav>


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

          <div className="max-w-6xl mx-auto px-4 py-8 space-y-24">

            <PeriodSelector
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
              setSelectedMonth={setSelectedMonth}
              setSelectedYear={setSelectedYear}
              years={years}
            />

            <section id="summary" className="grid grid-cols-1 md:grid-cols-2 gap-6 scroll-mt-20">
              <Balance transactions={filteredTransactions} selectedMonth={selectedMonth} selectedYear={selectedYear} />
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
            </section>

            <section id="transactions" className="grid grid-cols-1 lg:grid-cols-3 gap-8 scroll-mt-20">
              <TransactionForm
                onAddTransaction={addTransaction}
                editingTransaction={editingTransaction}
                onUpdateTransaction={updateTransaction}
                onCancelEdit={() => setEditingTransaction(null)}
              />
              <div className="lg:col-span-2">
                <TransactionList
                  transactions={sortedTransactions}
                  selectedCategory={selectedCategory}
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
            </section>

            <section id="analytics" className="grid grid-cols-1 lg:grid-cols-3 gap-8 scroll-mt-20">
              <div className="lg:col-span-1">
                <OneLevelPieChart transactions={filteredTransactions} />
              </div>

              <div className="lg:col-span-2">
                <MonthlyBarChart
                  transactions={transactions}
                  selectedYear={selectedYear}
                />
              </div>
            </section>

          </div>


          <section className="grid place-items-center">
            <footer>
              Made by <a href='https://github.com/DanielGodoyGalindo/expense-tracker' className='cursor-pointer; text-indigo-600 dark:text-indigo-400 hover:underline font-bold' target='_blank'>Daniel Godoy</a>
            </footer>
          </section>

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
        </main>
      </div>
    </div>
  );
}

export default App
