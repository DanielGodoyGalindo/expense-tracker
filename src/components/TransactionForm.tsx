import { useState } from "react";
import type { Transaction } from "../types/transaction";

type Props = {
  onAddTransaction: (transaction: Transaction) => void;
};

function TransactionForm({ onAddTransaction }: Props) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Expense");
  const [date, setDate] = useState("");

  function handleCategory(event: React.ChangeEvent<HTMLSelectElement>) {
    setCategory(event.target.value);
  }

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title || !amount || !date) {
      alert("Please fill in all fields.");
      return;
    }
    try {
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
      setCategory("Expense");
      setDate("");
    } catch (error) {
      alert(`Not able to create transaction. Error: ${error}`)
    }
  }

  const border_style = "border border-gray-300 rounded-sm"

  return (
    <div className="place-self-center flex flex-col gap-2">
      <h1 className="underline self-center text-lg text-shadow-md font-bold">Add your expense / income</h1>
      <form className="flex flex-col gap-2 justify-center place-self-center shadow-2xl border-2 border-indigo-900 rounded-lg p-2" onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} className={`${border_style} p-2`} onChange={(e) => setTitle(e.target.value)} required/>
        <input type="number" placeholder="Amount" value={amount} className={`${border_style} p-2`} onChange={(e) => setAmount(e.target.value)} required/>
        <select value={category} className={`${border_style} p-2`} onChange={handleCategory} required>
          <option>Expense</option>
          <option>Income</option>
        </select>
        <input type="date" value={date} className={`${border_style} p-2`} onChange={(e) => setDate(e.target.value)} required/>
        <button type="submit" className="bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-4 border border-black rounded hover:cursor-pointer"> Add transaction </button>
      </form>
    </div>
  );
}


export default TransactionForm;