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

  return (
    <div className="flex flex-col justify-center p-6 gap-4">
      <p className="flex justify-center underline">
        Transaction list
      </p>

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

      <div className="flex justify-center items-center gap-4">
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
          className="bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default TransactionList;