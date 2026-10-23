import { Component, inject, signal } from '@angular/core';
import { Restaurants } from '../../services/restaurants';
import { Restaurant } from '../../Model/restaurant.model';

@Component({
  imports: [],
  selector: 'app-admin-restaurant-list',
  styleUrl: './admin-restaurant-list.scss',
  templateUrl: './admin-restaurant-list.html',
})
export class AdminRestaurantList {
  private restaurantService = inject(Restaurants);
  restaurantList = signal<Restaurant[]>([])
}
