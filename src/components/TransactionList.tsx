import TransactionItem from "./TransactionItem";
import type { Transaction } from "../types/transaction";

type Props = {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
};

function TransactionList({ transactions, onDeleteTransaction }: Props) {
  return (
    <div className="flex flex-col justify-center p-6 gap-4">
      <p className="flex justify-center underline">Transaction list</p>
      <table className="table-fixed w-full">
        <tr className="h-12">
          <th>Title</th>
          <th>Ammount</th>
          <th>Category</th>
          <th>Date</th>
          <th>Delete</th>
        </tr>
        {transactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            onDeleteTransaction={onDeleteTransaction}
          />
        ))}
      </table>
    </div>
  );
}

export default TransactionList;