import { Component, computed, inject, signal } from '@angular/core';
import { RestaurantCard } from '../restaurant-card/restaurant-card';
import { Restaurants } from '../../services/restaurants';
import { Cuisine } from '../../Model/restaurant.model';

@Component({
  imports: [RestaurantCard],
  selector: 'app-restaurant-list',
  styleUrl: './restaurant-list.scss',
  templateUrl: './restaurant-list.html',
})
export class RestaurantList {
  private restaurantService = inject(Restaurants);

  nameFilter = signal('');
  cuisineFilter = signal('all');
  statusFilter = signal('all');
  sortFilter = signal('rating');

  displayedRestaurants = computed(() => {
    const name = this.nameFilter();
    const cuisine = this.cuisineFilter();
    const status = this.statusFilter();
    const sort = this.sortFilter();
    const all = this.restaurantService.restaurants();
    const nameToLower = name.toLowerCase();

    const result = all.filter((restaurant) => {
      const nameMatch = restaurant.name.toLowerCase().includes(nameToLower);
      const cuisineMatch = cuisine === 'all' || restaurant.cuisine === cuisine;
      const statusMatch =
        status === 'all' ||
        (restaurant.isActive === true && status === 'open') ||
        (restaurant.isActive === false && status === 'closed');

      return nameMatch && cuisineMatch && statusMatch;
    });
    result.sort((a, b) => {
      switch (sort) {
        case 'rating':
          return b.rating - a.rating;
        case 'deliveryTime':
          return a.deliveryTimeMin - b.deliveryTimeMin;
        case 'deliveryCost':
          return a.deliveryFee - b.deliveryFee;
        default:
          return 0;
      }
    });
    return result
  });
  onNameChange(name: string) {
    this.nameFilter.set(name);
  }
  onCuisineChange(cuisine: string) {
    this.cuisineFilter.set(cuisine);
  }
  onStatusChange(status: string) {
    this.statusFilter.set(status);
  }
  onSortChange(sort: string) {
    this.sortFilter.set(sort);
  }
  resetFilters() {
    this.nameFilter.set('');
    this.cuisineFilter.set('all');
    this.statusFilter.set('all');
    this.sortFilter.set('rating');
  }
}
