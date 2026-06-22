import { Routes } from '@angular/router';

import { Dashboard } from './features/dashboard/dashboard/dashboard';
import { AddExpense } from './features/expenses/add-expense/add-expense';
import { Analytics } from './features/analytics/analytics/analytics';
import { AiInsights } from './features/ai-insights/ai-insights/ai-insights';
import { ExpenseListComponent } from './features/expenses/expense-list/expense-list';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },

  {
    path: 'dashboard',
    component: Dashboard
  },

  {
    path: 'expenses',
    component: ExpenseListComponent
  },

  {
    path: 'add-expense',
    component: AddExpense
  },

  {
    path: 'analytics',
    component: Analytics
  },

  {
    path: 'ai-insights',
    component: AiInsights
  }
];