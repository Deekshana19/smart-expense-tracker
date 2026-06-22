import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AiInsightsService {

  private http = inject(HttpClient);

  private apiUrl =
    'http://127.0.0.1:8000/ai-insights';

  getInsights() {
    return this.http.get<any>(
      `${this.apiUrl}/`
    );
  }
}