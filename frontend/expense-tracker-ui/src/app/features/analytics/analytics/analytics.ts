import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ChartConfiguration,
  ChartOptions
} from 'chart.js';

import { BaseChartDirective } from 'ng2-charts';

import { AnalyticsService } from '../../../services/analytics.service';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    CommonModule,
    BaseChartDirective
  ],
  templateUrl: './analytics.html',
  styleUrl: './analytics.css',
})
export class Analytics implements OnInit {

  private analyticsService = inject(AnalyticsService);

  pieChartData = signal<ChartConfiguration<'pie'>['data']>({
    labels: [],
    datasets: [
      {
        data: []
      }
    ]
  });

  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true
  };

  ngOnInit(): void {
    this.loadCategoryChart();
    this.loadDailyTrendChart();
  }

  loadCategoryChart(): void {
    this.analyticsService
      .getCategoryBreakdown()
      .subscribe({
        next: (data) => {
          this.pieChartData.set({
            labels: data.map(item => item.category),
            datasets: [
              {
                data: data.map(item => item.amount)
              }
            ]
          });
        },
        error: (err) => {
          console.error(err);
        }
      });
  }
  barChartData = signal<ChartConfiguration<'bar'>['data']>({
    labels: [],
    datasets: [
      {
        label: 'Daily Spending',
        data: []
      }
    ]
  });

  barChartOptions: ChartOptions<'bar'> = {
    responsive: true
  };

  loadDailyTrendChart(): void {
    this.analyticsService
      .getMonthlySummary()
      .subscribe({
        next: (data) => {
          this.barChartData.set({
            labels: data.map(item => item.date),
            datasets: [
              {
                label: 'Daily Spending',
                data: data.map(item => item.amount)
              }
            ]
          });
        },
        error: (err) => {
          console.error(err);
        }
      });
  }
}