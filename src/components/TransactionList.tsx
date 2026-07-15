import TransactionItem from "./TransactionItem";
import type { Transaction } from "../types/transaction";
import { useState, useEffect } from "react";

type Props = {
  transactions: Transaction[];
  selectedMonth: string;
  selectedYear: string;
  setSelectedMonth: React.Dispatch<React.SetStateAction<string>>;
  setSelectedYear: React.Dispatch<React.SetStateAction<string>>;
  onDeleteTransaction: (id: string) => void;
};

function TransactionList({ transactions, selectedMonth, selectedYear, setSelectedMonth, setSelectedYear, onDeleteTransaction }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const years = [...new Set(transactions.map((t) => t.date.slice(0, 4)))];
  const months = [
    { name: "January", value: "01" },
    { name: "February", value: "02" },
    { name: "March", value: "03" },
    { name: "April", value: "04" },
    { name: "May", value: "05" },
    { name: "June", value: "06" },
    { name: "July", value: "07" },
    { name: "August", value: "08" },
    { name: "September", value: "09" },
    { name: "October", value: "10" },
    { name: "November", value: "11" },
    { name: "December", value: "12" },
  ];


  useEffect(() => {
    if (transactions.length > 0 && !years.includes(selectedYear)) {
      setSelectedYear(years[0]);
    }
  }, [transactions]);

  const filteredTransactions = transactions.filter((transaction) => {
    const transactionYear = transaction.date.slice(0, 4);
    const transactionMonth = transaction.date.slice(5, 7);

    return (
      transactionYear === selectedYear &&
      transactionMonth === selectedMonth
    );
  });

  const indexOfLastTransaction = currentPage * itemsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - itemsPerPage;

  const currentTransactions = filteredTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const totalPages = Math.max(1, Math.ceil(filteredTransactions.length / itemsPerPage));

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedMonth, selectedYear]);


  return (
    <div className="flex flex-col justify-center p-6 gap-4">

      <p className="flex justify-center underline">
        Transaction list
      </p>


      {/* Month and year selectors */}
      <div className="flex justify-center gap-8">

        <div className="flex gap-2">
          <span>Month</span>
          <select className="border" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <span>Year</span>
          <select className="border" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
            {years.length > 0 ? (
              years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))
            ) : (
              <option value={String(new Date().getFullYear())}>
                {new Date().getFullYear()}
              </option>
            )}
          </select>
        </div>
      </div>


      {currentTransactions.length === 0 ? (

        <p className="text-center text-gray-500">
          No transactions found for this period
        </p>

      ) : (

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
      )}


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