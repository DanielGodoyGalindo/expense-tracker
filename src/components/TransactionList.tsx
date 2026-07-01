import TransactionItem from "./TransactionItem";
import type { Transaction } from "../types/transaction";

type Props = {
  transactions: Transaction[];
};

function TransactionList({ transactions }: Props) {
  return (
    <div>
      {transactions.map((transaction) => (
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
        />
      ))}
    </div>
  );
}

export default TransactionList;