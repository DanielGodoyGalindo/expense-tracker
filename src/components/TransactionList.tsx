import TransactionItem from "./TransactionItem";
import type { Transaction } from "../types/transaction";
import { useState } from "react";

type Props = {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
};

function TransactionList({ transactions, onDeleteTransaction }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = 5;
  const indexOfLastTransaction = currentPage * itemsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - itemsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  const years = [...new Set(transactions.map((t) => t.date.slice(0, 4)))];
  

  return (
    <div className="flex flex-col justify-center p-6 gap-4">
      <p className="flex justify-center underline">
        Transaction list
      </p>

      {/* Month and year selectors */}
      <div className="flex gap-2">
        <span>Month</span>
        <select className="border">
          {months.map(m => <option key={m}>{m}</option>)}
        </select>
        <span>Year</span>
        <select className="border">
          {years.map((year) => (
            <option key={year}>{year}</option>
          ))}
        </select>
      </div>

      <table className="table-fixed w-full">
        <thead>
          <tr className="h-12">
            <th>Title</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {currentTransactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onDeleteTransaction={onDeleteTransaction}
            />
          ))}
        </tbody>
      </table>


      {transactions.length === 0 ? (
        <p className="text-center text-gray-500">
          No transactions yet.
        </p>
      ) : (
        < div className="flex justify-center items-center gap-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-50">
            Previous
          </button>

          <span className="items-center">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-50">
            Next
          </button>
        </div>)
      }
    </div >
  );
}

export default TransactionList;