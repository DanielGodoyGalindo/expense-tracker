// https://www.typescriptlang.org/docs/handbook/2/objects.html

type Transaction = {
    id: string;
    title: string;
    amount: number;
    category: "bills" | "rent / mortgage" | "food" | "leisure" | "other expense" | "payroll" | "other income";
    date: string;
}

export type { Transaction }