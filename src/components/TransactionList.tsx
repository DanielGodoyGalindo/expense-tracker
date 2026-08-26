import TransactionItem from "./TransactionItem";
import type { Transaction } from "../types/transaction";
import { useState, useEffect } from "react";
import type { Category } from "../types/filters";
import { categories } from "../types/filters";
import { exportTransactionsToCSV } from "../utils/csv";

type Props = {
  transactions: Transaction[];
  selectedCategory: Category;
  setEditingTransaction: React.Dispatch<React.SetStateAction<Transaction | null>>;
  setSelectedCategory: React.Dispatch<React.SetStateAction<Category>>;
  searchTitle: string;
  setSearchTitle: React.Dispatch<React.SetStateAction<string>>;
  sortBy: "date" | "amount" | "title";
  setSortBy: React.Dispatch<React.SetStateAction<"date" | "amount" | "title">>;
  sortOrder: "asc" | "desc";
  setSortOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
  onRequestDelete: (transaction: Transaction) => void;
};

function TransactionList({ transactions, selectedCategory, setEditingTransaction, setSelectedCategory, searchTitle, setSearchTitle, sortBy, setSortBy, sortOrder, setSortOrder, onRequestDelete }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredTransactions = transactions;

  const indexOfLastTransaction = currentPage * itemsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - itemsPerPage;

  const currentTransactions = filteredTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const totalPages = Math.max(1, Math.ceil(filteredTransactions.length / itemsPerPage));

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const border_style = "border border-gray-300 rounded-sm pl-1 pr-1 bg-white dark:bg-gray-700"

  const handleExportCSV = () => {
    if (transactions.length === 0) {
      return;
    }
    exportTransactionsToCSV(transactions);
  };

  return (
    <div className="flex flex-col justify-center p-6 gap-4">

      <p className="underline self-center text-lg text-shadow-md font-bold">
        Transaction list
      </p>


      {/* Filters: Category, month, year selectors and search by title input */}
      <div className="flex justify-center items-center gap-4 flex-wrap">

        <div className="flex gap-2">
          <span>Category</span>
          <select className={border_style} value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value as Category)}>
            {categories.map((category) =>
              <option key={category} value={category}>
                {category}
              </option>
            )}
          </select>
        </div>

        <div className="flex gap-2">
          <span>Search</span>
          <input
            className={border_style}
            type="text"
            placeholder="Search title..."
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}></input>
        </div>

        <button
          onClick={handleExportCSV}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-0.5 px-2 rounded cursor-pointer">
          Export CSV
        </button>

      </div>


      {/* Transactions table */}
      {currentTransactions.length === 0 ? (

        <p className="text-center text-gray-500 dark:text-gray-400">
          No transactions found for this period
        </p>

      ) : (

        <table className="table-fixed w-full">
          <thead>
            <tr className="h-12 text-indigo-700 dark:text-indigo-400 [&>th]:italic">
              <th
                onClick={() => {
                  if (sortBy === "title") {
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                  } else {
                    setSortBy("title");
                    setSortOrder("asc");
                  }
                }}
                className="cursor-pointer">
                Title {sortBy === "title" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th
                onClick={() => {
                  if (sortBy === "amount") {
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                  } else {
                    setSortBy("amount");
                    setSortOrder("asc");
                  }
                }}
                className="cursor-pointer">
                Amount {sortBy === "amount" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th>Category</th>
              <th
                onClick={() => {
                  if (sortBy === "date") {
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                  } else {
                    setSortBy("date");
                    setSortOrder("asc");
                  }
                }}
                className="cursor-pointer">
                Date {sortBy === "date" && (sortOrder === "asc" ? "▲" : "▼")}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
                setEditingTransaction={setEditingTransaction}
                onRequestDelete={onRequestDelete}
              />
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination buttons */}
      {filteredTransactions.length > 0 && (
        <div className="flex justify-center items-center gap-4">

          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-50">
            Previous
          </button>

          <span className="flex items-center">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-50">
            Next
          </button>

        </div>
      )}
    </div>
  );
}

export default TransactionList;