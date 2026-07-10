import type { Transaction } from "../types/transaction";

type Props = {
  transaction: Transaction;
  onDeleteTransaction: (id: string) => void;
};

function TransactionItem({ transaction, onDeleteTransaction }: Props) {
  return (
    <tr className="text-center odd:bg-indigo-50 even:bg-indigo-100 h-12">
      <td>{transaction.title}</td>  
      <td>{transaction.amount} €</td>
      <td>{transaction.category}</td>
      <td>{transaction.date}</td>
      <td><button onClick={() => onDeleteTransaction(transaction.id)} className="text-red-600 hover:cursor-pointer hover:underline">Delete</button></td>
    </tr>
  );
}

export default TransactionItem;