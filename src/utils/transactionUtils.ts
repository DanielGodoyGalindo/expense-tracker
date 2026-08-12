import type { Transaction } from "../types/transaction";
import type { Category, SortBy, SortOrder } from "../types/filters"; 

export function filterTransactions(
  transactions: Transaction[],
  selectedYear: string,
  selectedMonth: string,
  selectedCategory: Category,
  searchTitle: string
): Transaction[] {
  return transactions
    .filter((transaction) => { // Selected date
      const year = transaction.date.slice(0, 4);
      const month = transaction.date.slice(5, 7);
      return year === selectedYear && month === selectedMonth;
    })
    .filter((transaction) => // Selected category
      selectedCategory === "Both"
        ? true
        : transaction.category === selectedCategory
    )
    .filter((transaction) => // Search by title
      transaction.title
        .toLowerCase()
        .includes(searchTitle.toLowerCase())
    );
}

// Sort trasaction list (by date, amount or transaction title)
export function sortTransactions(
  transactions: Transaction[],
  sortBy: SortBy,
  sortOrder: SortOrder
): Transaction[] {
  return [...transactions].sort((a, b) => {
    switch (sortBy) {
      case "date":
        return sortOrder === "asc"
          ? a.date.localeCompare(b.date)
          : b.date.localeCompare(a.date);

      case "amount":
        return sortOrder === "asc"
          ? a.amount - b.amount
          : b.amount - a.amount;

      case "title":
        return sortOrder === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);

      default:
        return 0;
    }
  });
}