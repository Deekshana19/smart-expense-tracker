import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpenseService } from '../../../services/expense.service';
import { Expense } from '../../../models/expense.model';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expense-list.html',
  styleUrl: './expense-list.css'
})
export class ExpenseListComponent implements OnInit {

  private expenseService = inject(ExpenseService);

  expenses: Expense[] = [];

  ngOnInit(): void {
    this.loadExpenses();
  }

 loadExpenses(): void {
  console.log('Loading expenses...');

  this.expenseService.getExpenses().subscribe({
    next: (data: Expense[]) => {
      console.log('API Response:', data);
      this.expenses = data;
    },
    error: (err: any) => {
      console.error('API Error:', err);
    }
  });
}
}