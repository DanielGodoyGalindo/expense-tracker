import { Pie, PieChart, Tooltip, Legend, Cell } from "recharts";
import type { Transaction } from "../types/transaction";

type Props = {
  transactions: Transaction[];
};

export default function OneLevelPieChart({ transactions }: Props) {
  const income = transactions
    .filter((transaction) => transaction.category === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const expenses = transactions
    .filter((transaction) => transaction.category === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const data = [
    {
      name: "Income",
      value: income,
    },
    {
      name: "Expenses",
      value: expenses,
    },
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <PieChart
      className="self-center -mt-24"
      style={{
        width: "100%",
        height: "100%",
        maxWidth: "600px",
        maxHeight: "80vh",
        aspectRatio: 1,
      }}
      responsive
    >
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius="50%"
      >
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index]} />
        ))}
      </Pie>

      <Tooltip />
      <Legend />
    </PieChart>
  );
}