import type { Transaction } from "../types/transaction";

type Props = {
  transaction: Transaction;
  onDeleteTransaction: (id: string) => void;
};

function TransactionItem({ transaction, onDeleteTransaction }: Props) {
  return (
    <div className="flex flex-col place-self-center border-4 w-1/6 p-2 border-indigo-900 m-2 text-center rounded-lg shadow">
      <h3>{transaction.title}</h3>
      <p>{transaction.amount} €</p>
      <p>{transaction.category}</p>
      <p>{transaction.date}</p>
      <button onClick={() => onDeleteTransaction(transaction.id)} className="text-red-600 hover:cursor-pointer hover:underline">Delete</button>
    </div>
  );
}

export default TransactionItem;