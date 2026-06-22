import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  private http = inject(HttpClient);

  private apiUrl = 'http://127.0.0.1:8000/analytics';

  getCategoryBreakdown() {
    return this.http.get<any[]>(
      `${this.apiUrl}/category-breakdown`
    );
  }

  getMonthlySummary() {
    return this.http.get<any[]>(
      `${this.apiUrl}/monthly-summary`
    );
  }
}