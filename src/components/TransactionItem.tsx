import type { Transaction } from "../types/transaction";

type Props = {
  transaction: Transaction;
  onDeleteTransaction: (id: string) => void;
  setEditingTransaction: React.Dispatch<React.SetStateAction<Transaction | null>>;
};

function TransactionItem({ transaction, onDeleteTransaction, setEditingTransaction }: Props) {
  return (
    <tr className="text-center odd:bg-indigo-50 even:bg-indigo-100 h-12">
      <td>{transaction.title}</td>
      <td>{transaction.amount} €</td>
      <td>{transaction.category}</td>
      <td>{transaction.date}</td>
      <td>
        <div className="flex justify-center gap-2">
          <button onClick={() => onDeleteTransaction(transaction.id)} className="text-red-600 hover:cursor-pointer hover:underline">Del</button>
          <button onClick={() => setEditingTransaction(transaction)} className="hover:cursor-pointer hover:underline">Edit</button>
        </div>
      </td>
    </tr>
  );
}

export default TransactionItem;