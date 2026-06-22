import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardService } from '../../../services/dashboard-service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html'
})
export class Dashboard implements OnInit {

  private dashboardService = inject(DashboardService);

  totalExpenses = signal(0);
  expenseCount = signal(0);
  topCategory = signal('N/A');

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {

    this.dashboardService.getTotalExpenses()
      .subscribe(res => {
        this.totalExpenses.set(res.total_expenses ?? 0);
      });

    this.dashboardService.getExpenseCount()
      .subscribe(res => {
        this.expenseCount.set(res.count ?? 0);
      });

    this.dashboardService.getCategorySummary()
      .subscribe(res => {

        if (res.length > 0) {

          const highest = res.reduce(
            (prev, current) =>
              prev.total > current.total
                ? prev
                : current
          );

          this.topCategory.set(highest.category);
        }
      });
  }
}