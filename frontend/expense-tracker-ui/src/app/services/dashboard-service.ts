import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private http = inject(HttpClient);

  private apiUrl = 'http://127.0.0.1:8000/dashboard';

  getTotalExpenses(): Observable<any> {
    return this.http.get(`${this.apiUrl}/total-expenses`);
  }

  getExpenseCount(): Observable<any> {
    return this.http.get(`${this.apiUrl}/expense-count`);
  }

  getCategorySummary(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/category-summary`);
  }
}