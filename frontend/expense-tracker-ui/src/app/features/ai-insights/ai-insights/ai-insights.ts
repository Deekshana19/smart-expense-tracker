import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AiInsightsService } from '../../../services/ai-insights.service';

@Component({
  selector: 'app-ai-insights',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ai-insights.html',
  styleUrl: './ai-insights.css'
})
export class AiInsights implements OnInit {

  private aiService = inject(AiInsightsService);

  insights = signal<string[]>([]);

  ngOnInit(): void {
    this.loadInsights();
  }

  loadInsights(): void {
    this.aiService.getInsights().subscribe({
      next: (res) => {
        this.insights.set(res.insights ?? []);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}