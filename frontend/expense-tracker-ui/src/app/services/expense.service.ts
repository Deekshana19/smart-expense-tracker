import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Expense } from '../models/expense.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private http = inject(HttpClient);

  private apiUrl = 'http://127.0.0.1:8000/expenses';

  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.apiUrl}/`);
  }

  createExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(`${this.apiUrl}/`, expense);
  }

  getExpenseById(id: number): Observable<Expense> {
    return this.http.get<Expense>(`${this.apiUrl}/${id}`);
  }

  updateExpense(id: number, expense: Expense): Observable<Expense> {
    return this.http.put<Expense>(`${this.apiUrl}/${id}`, expense);
  }

  deleteExpense(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}