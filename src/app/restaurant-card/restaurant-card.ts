import { Component, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-restaurant-card',
  styleUrl: './restaurant-card.scss',
  templateUrl: './restaurant-card.html',
})
export class RestaurantCard {
  Name = signal('Mak');
  restaurant = signal({
    name: 'Mak',
    description: 'Opis',
  });
}
