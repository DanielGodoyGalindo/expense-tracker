import { useState } from "react";

type Props = {
  budget: number;
  expenses: number;
  onSetBudget: (amount: number) => void;
};

function Budget({ budget, expenses, onSetBudget }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(String(budget));

  const percentage = budget > 0 ? (expenses / budget) * 100 : 0;
  const progress = Math.min(percentage, 100);
  const progressStyle =
    percentage >= 100 ? "bg-red-600"
      : percentage >= 80 ? "bg-yellow-500" : "bg-indigo-600";

  function handleEdit() {
    setNewBudget(String(budget));
    setIsEditing(true);
  }

  function handleSave() {
    const amount = Number(newBudget);
    if (amount <= 0) {
      return;
    }
    onSetBudget(amount);
    setIsEditing(false);
  }

  function handleCancel() {
    setNewBudget(String(budget));
    setIsEditing(false);
  }

  return (
    <div className="self-center w-full max-w-lg flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <p className="underline self-center text-lg text-shadow-md font-bold">
          Monthly budget
        </p>

        {!isEditing && (
          <button
            type="button"
            onClick={handleEdit}
            className="text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer">
            Edit budget
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="flex gap-2">
          <input
            type="number"
            min="1"
            value={newBudget}
            onChange={(e) => setNewBudget(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 w-full"
          />

          <button
            type="button"
            onClick={handleSave}
            className="bg-indigo-600 hover:bg-indigo-800 text-white px-3 py-1 rounded">
            Save
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded">
            Cancel
          </button>
        </div>
      ) : (
        <>
          {budget ? (
            <>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className={`${progressStyle} h-4 rounded-full transition-all`}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-center">
                {expenses} € / {budget} €
              </p>
            </>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">No budget found for selected period</p>
          )}
        </>
      )}
    </div>
  );
}

export default Budget;