import { Component, inject, input } from '@angular/core';
import { Restaurants } from '../../services/restaurants';

@Component({
  imports: [],
  selector: 'app-restaurant-details',
  styleUrl: './restaurant-details.scss',
  templateUrl: './restaurant-details.html',
})
export class RestaurantDetails {
  id = input<string>();
  private restaurantService = inject(Restaurants);
}
