import { useState } from "react";
import type { Transaction } from "../types/transaction";

type Props = {
  onAddTransaction: (transaction: Transaction) => void;
};

function TransactionForm({ onAddTransaction }: Props) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("food");
  const [date, setDate] = useState("");

  function handleCategory(event: React.ChangeEvent<HTMLSelectElement>) {
    setCategory(event.target.value);
  }

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const transaction: Transaction = {
      id: crypto.randomUUID(),
      title,
      amount: Number(amount),
      category: category as Transaction["category"],
      date,
    };
    onAddTransaction(transaction);
    setTitle("");
    setAmount("");
    setCategory("food");
    setDate("");
  }

  return (
    <div className="place-self-center">
      <h1>Add your Expense / Income</h1>
      <form className="flex flex-col gap-6 justify-center place-self-center shadow-2xl border-2 border-indigo-900 rounded-lg p-2" onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />

        <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />

        <select value={category} onChange={handleCategory}>
          <option>Food</option>
          <option>Leisure</option>
          <option>Payroll</option>
        </select>

        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

        <button type="submit" className="bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-4 border border-black rounded"> Add transaction </button>
      </form>
    </div>
  );
}


export default TransactionForm;