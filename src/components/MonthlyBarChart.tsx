import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import type { Transaction } from "../types/transaction";

type Props = { transactions: Transaction[]; selectedYear: string; };

function MonthlyBarChart({ transactions, selectedYear }: Props) {

  const months = [
    { name: "Jan", value: "01" },
    { name: "Feb", value: "02" },
    { name: "Mar", value: "03" },
    { name: "Apr", value: "04" },
    { name: "May", value: "05" },
    { name: "Jun", value: "06" },
    { name: "Jul", value: "07" },
    { name: "Aug", value: "08" },
    { name: "Sep", value: "09" },
    { name: "Oct", value: "10" },
    { name: "Nov", value: "11" },
    { name: "Dec", value: "12" },
  ];

  const data = months.map((month) => {
    const expenses = transactions
      .filter(
        (transaction) =>
          transaction.date.slice(0, 4) === selectedYear &&
          transaction.date.slice(5, 7) === month.value &&
          transaction.category === "Expense"
      )
      .reduce((total, transaction) => total + transaction.amount, 0);

    return {
      month: month.name,
      expenses,
    };
  });

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-4xl flex flex-col items-center">
        <p className="underline text-lg text-shadow-md font-bold">
          Monthly Bar Chart
        </p>

        <h2 className="text-center font-bold">
          Expenses for {selectedYear}
        </h2>

        <div className="w-full">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="expenses" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default MonthlyBarChart;