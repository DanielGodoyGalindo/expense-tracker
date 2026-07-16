// https://www.typescriptlang.org/docs/handbook/2/objects.html

type Transaction = {
    id: string;
    title: string;
    amount: number;
    category: "Expense" | "Income";
    date: string;
}

export type { Transaction }