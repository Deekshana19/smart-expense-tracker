export interface Expense {
  id?: number;
  amount: number;
  description?: string;
  category: string;
  payment_method: string;
  expense_date: string;
}