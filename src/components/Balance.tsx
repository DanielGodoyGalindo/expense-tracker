import type { Transaction } from "../types/transaction";

type Props = {
  transactions: Transaction[];
};

function Balance({ transactions }: Props) {

  const balance = transactions.reduce(
    (total, transaction) =>
      transaction.category === "income"
        ? total + transaction.amount
        : total - transaction.amount,
    0
  );

  return (
    <div
      className={`place-self-center flex gap-1 border-4 rounded-xl p-2 ${balance < 0 ? "border-red-600" : "border-green-600"} mt-3 text-4xl`}>
      <p>Your balance:</p>
      <p>{balance} €</p>
    </div>
  )
}

export default Balance;