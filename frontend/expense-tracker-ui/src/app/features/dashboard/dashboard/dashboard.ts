import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardService } from '../../../services/dashboard-service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html'
})
export class Dashboard implements OnInit {

  private dashboardService = inject(DashboardService);

  totalExpenses = 0;
  expenseCount = 0;
  topCategory = 'N/A';

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {

    this.dashboardService.getTotalExpenses()
      .subscribe(res => {
        this.totalExpenses = res.total_expenses;
      });

    this.dashboardService.getExpenseCount()
      .subscribe(res => {
        this.expenseCount = res.count;
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

          this.topCategory = highest.category;
        }
      });
  }
}