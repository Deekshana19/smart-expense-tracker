import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Header } from './core/header/header';
import { Sidebar } from './core/sidebar/sidebar';
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Header,
    Sidebar,

  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}