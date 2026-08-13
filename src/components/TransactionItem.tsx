import type { Transaction } from "../types/transaction";

type Props = {
  transaction: Transaction;
  setEditingTransaction: React.Dispatch<React.SetStateAction<Transaction | null>>;
  onRequestDelete: (transaction: Transaction) => void;
};

function TransactionItem({ transaction, setEditingTransaction, onRequestDelete }: Props) {

  return (
    <tr className="text-center odd:bg-indigo-50 even:bg-indigo-100 h-12 dark:odd:bg-gray-600 dark:even:bg-gray-700">
      <td>{transaction.title}</td>
      <td>{transaction.amount} €</td>
      <td>{transaction.category}</td>
      <td>{transaction.date}</td>
      <td>
        <div className="flex justify-center gap-2">
          <button onClick={() => onRequestDelete(transaction)} className="text-red-600 dark:text-red-500 hover:cursor-pointer hover:underline">Del</button>
          <button onClick={() => setEditingTransaction(transaction)} className="hover:cursor-pointer hover:underline">Edit</button>
        </div>
      </td>
    </tr>
  );
}

export default TransactionItem;