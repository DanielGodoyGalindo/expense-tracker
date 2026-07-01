import type { Transaction } from "../types/transaction";

type Props = {
  transaction: Transaction;
};

function TransactionItem({ transaction }: Props) {
  return (
    <div>
      <h3>{transaction.title}</h3>
      <p>{transaction.amount} €</p>
      <p>{transaction.category}</p>
      <p>{transaction.date}</p>
    </div>
  );
}

export default TransactionItem;