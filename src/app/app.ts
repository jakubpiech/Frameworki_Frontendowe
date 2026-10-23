import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { RestaurantList } from './components/restaurant-list/restaurant-list';
import { Footer } from './components/footer/footer';

@Component({
  imports: [Header, Footer, RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('foodapp');
}
