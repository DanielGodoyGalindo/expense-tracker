import type { Transaction } from "../types/transaction";

export function exportTransactionsToCSV(transactions: Transaction[]) {
  const headers = ["Title", "Amount", "Category", "Date"];

  const rows = transactions.map((transaction) => [
    transaction.title,
    transaction.amount,
    transaction.category,
    transaction.date,
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) =>
      row
        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
        .join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "expense-tracker.csv";
  link.click();

  URL.revokeObjectURL(url);
}