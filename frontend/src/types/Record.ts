export interface Record {
  userId: string;
  type: "income" | "outcome";
  title: string;
  amount: number;
  currency: "TL" | "USD" | "EUR";
  status: boolean;
  dueDate?: number;
  transactionDate?: number;
  installment: boolean;
  installmentCount?: number;
  count: number;
  tags?: string[];
  created_at?: string;
  updated_at?: string;
}
