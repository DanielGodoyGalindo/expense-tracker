import TransactionItem from "./TransactionItem";
import type { Transaction } from "../types/transaction";

type Props = {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
};

function TransactionList({ transactions, onDeleteTransaction }: Props) {
  return (
    <div className="flex flex-col justify-center">
      {transactions.map((transaction) => (
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
          onDeleteTransaction={onDeleteTransaction}
        />
      ))}
    </div>
  );
}

export default TransactionList;