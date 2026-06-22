import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ExpenseListComponent } from './features/expenses/expense-list/expense-list';
@Component({
  selector: 'app-root',
  imports: [ExpenseListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'expense-tracker-ui';
}
