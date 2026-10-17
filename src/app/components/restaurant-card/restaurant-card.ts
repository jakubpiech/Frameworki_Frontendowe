import { Component, model, signal } from '@angular/core';
import { Restaurant } from '../../Model/restaurant.model';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-restaurant-card',
  styleUrl: './restaurant-card.scss',
  templateUrl: './restaurant-card.html',
})
export class RestaurantCard {
  private CanUpdate = signal(true);

  restaurant = model<Restaurant>({
    id: 0,
    name: 'Wpisz nazwe',
    description: 'Wpisz opis',
    cuisine: 'polish',
    imageUrl: 'https://via.placeholder.com/150',
    rating: 0,
    deliveryTimeMin: 0,
    deliveryTimeMax: 0,
    deliveryFee: 0,
    minimumOrderValue: 0,
    isActive: false,
    address: '',
    menuCategories: [],
  });
}
