import type { Transaction } from "../types/transaction";

type Props = {
  transaction: Transaction;
};

function TransactionItem({ transaction }: Props) {
  return (
    <div className="flex-col place-self-center border-3 min-w-1/6 p-2 border-blue-400 m-2 text-center">
      <h3>{transaction.title}</h3>
      <p>{transaction.amount} €</p>
      <p>{transaction.category}</p>
      <p>{transaction.date}</p>
    </div>
  );
}

export default TransactionItem;