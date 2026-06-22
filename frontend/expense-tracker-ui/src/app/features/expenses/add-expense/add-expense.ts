import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ExpenseService } from '../../../services/expense.service';

@Component({
  selector: 'app-add-expense',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-expense.html'
})
export class AddExpense {

  private fb = inject(FormBuilder);
  private expenseService = inject(ExpenseService);

  expenseForm: FormGroup = this.fb.group({
    amount: ['', Validators.required],
    category: ['', Validators.required],
    payment_method: ['', Validators.required],
    expense_date: ['', Validators.required],
    description: ['']
  });

  onSubmit(): void {

    if (this.expenseForm.invalid) {
      this.expenseForm.markAllAsTouched();
      return;
    }

    this.expenseService
      .createExpense(this.expenseForm.value)
      .subscribe({
        next: () => {
          alert('Expense added successfully ✅');
          this.expenseForm.reset();
        },
        error: (err) => {
          console.error(err);
          alert('Failed to save expense');
        }
      });
  }
}