import type { Transaction } from "../types/transaction";

type Props = {
  transactions: Transaction[];
  selectedMonth: string;
  selectedYear: string;
};

function Balance({ transactions, selectedMonth, selectedYear }: Props) {

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

  const monthName =
    months.find((month) => month.value === selectedMonth)?.name ?? selectedMonth;

  const balance = transactions.reduce(
    (total, transaction) =>
      transaction.category === "Income"
        ? total + transaction.amount
        : total - transaction.amount,
    0
  );

  if (transactions.length === 0) {
    return null;
  }

  return (
    <div
      className={`place-self-center flex flex-col gap-1 border-4 rounded-xl p-2 ${balance < 0 ? "border-rose-500" : "border-emerald-500"} mt-3 text-2xl`}>
      {transactions.length > 0 ? (
        <>
          <p>Your balance for {monthName} {selectedYear}:</p>
          <p className="text-center font-bold">{balance} €</p>
        </>
      ) : (
        <span>No transactions for this month.</span>
      )}
    </div>
  )
}

export default Balance;