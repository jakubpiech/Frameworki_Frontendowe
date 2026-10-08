import { Component, signal } from '@angular/core';
import { RestaurantCard } from '../restaurant-card/restaurant-card';
import data from '../../../data/restaurants.json';
import { Restaurant } from '../../Model/restaurant.model';

@Component({
  imports: [RestaurantCard],
  selector: 'app-restaurant-list',
  styleUrl: './restaurant-list.scss',
  templateUrl: './restaurant-list.html',
})
export class RestaurantList {
  private restaurants = signal(data as Restaurant[]);

  nameFilter = signal('');
  cuisineFilter = signal('all');
  statusFilter = signal('all');
  sortFilter = signal('rating');
}
