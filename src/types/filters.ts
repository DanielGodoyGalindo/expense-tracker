export type Category = "Both" | "Expense" | "Income";
export const categories: Category[] = [
  "Both",
  "Expense",
  "Income",
];

export type SortBy = "date" | "amount" | "title";
export const sortOptions: SortBy[] = [
  "date",
  "amount",
  "title",
];

export type SortOrder = "asc" | "desc";