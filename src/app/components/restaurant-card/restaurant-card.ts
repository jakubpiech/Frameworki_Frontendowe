import { Component, model, signal } from '@angular/core';
import { Restaurant } from '../../Model/restaurant.model';

@Component({
  imports: [],
  selector: 'app-restaurant-card',
  styleUrl: './restaurant-card.scss',
  templateUrl: './restaurant-card.html',
})
export class RestaurantCard {
  private CanUpdate = signal(true);

  restaurant = model<Restaurant>({
    name: 'Wpisz nazwe',
    description: 'Wpisz opis',
    cuisine: 'Wpisz kuchnie',
    imageUrl: 'https://via.placeholder.com/150',
    rating: 0,
    deliveryTimeMin: 0,
    deliveryTimeMax: 0,
    deliveryFee: 0,
    isActive: false,
  });
}
