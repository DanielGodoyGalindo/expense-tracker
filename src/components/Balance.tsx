import type { Transaction } from "../types/transaction";

type Props = {
  transactions: Transaction[];
};

function Balance({ transactions }: Props) {

  const balance = transactions.reduce(
    (total, transaction) =>
      transaction.category === "Income"
        ? total + transaction.amount
        : total - transaction.amount,
    0
  );

  return (
    <div
      className={`place-self-center flex gap-1 border-4 rounded-xl p-2 ${balance < 0 ? "border-rose-500" : "border-emerald-500"} mt-3 text-2xl`}>
      <p>Your balance:</p>
      <p>{balance} €</p>
    </div>
  )
}

export default Balance;