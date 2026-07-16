import { Pie, PieChart, Tooltip, Legend, type PieSectorShapeProps, Sector } from "recharts";
import type { Transaction } from "../types/transaction";

type Props = {
  transactions: Transaction[];
};

export default function OneLevelPieChart({ transactions }: Props) {
  const income = transactions
    .filter((transaction) => transaction.category === "Income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const expenses = transactions
    .filter((transaction) => transaction.category === "Expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const emerald_color = "#10b981"
  const rose_color = "#f43f5e"

  const data = [
    {
      name: "Income",
      value: income,
      fill: emerald_color,
    },
    {
      name: "Expenses",
      value: expenses,
      fill: rose_color,
    },
  ];

  const MyCustomPie = (props: PieSectorShapeProps) => <Sector {...props} fill={props.fill} />;
  const hasData = data.some((item) => item.value > 0);

  return hasData ? (
    <PieChart
      className="self-center -mt-24"
      style={{
        width: "100%",
        height: "100%",
        maxWidth: "600px",
        maxHeight: "40vh",
        aspectRatio: 1,
      }}
      responsive>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius="50%"
        shape={MyCustomPie}>
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  ) : (
    <div className="flex flex-col items-center justify-center py-8 text-gray-500">
      <p className="text-4xl">📊</p>
      <p>No transactions found for this period</p>
    </div>
  )
}