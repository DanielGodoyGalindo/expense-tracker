import './App.css'
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList'
import type { Transaction } from './types/transaction';

function App() {

  const transactions: Transaction[] = [
    {
      id: "1",
      title: "Salary",
      amount: 2500,
      category: "payroll",
      date: "2026-07-01",
    },
    {
      id: "2",
      title: "Rent",
      amount: -900,
      category: "rent / mortgage",
      date: "2026-07-02",
    },
    {
      id: "3",
      title: "Groceries",
      amount: -75,
      category: "food",
      date: "2026-07-03",
    },
  ];

  return (
    <>
      <TransactionForm />
      <TransactionList transactions={transactions} />
    </>
  )
}

export default App
