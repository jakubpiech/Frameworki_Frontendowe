import { Component, computed, inject, signal } from '@angular/core';
import { RestaurantCard } from '../restaurant-card/restaurant-card';
import { Restaurants } from '../../services/restaurants';

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
    const name = this.nameFilter().toLowerCase();
    const cuisine = this.cuisineFilter();
    const status = this.statusFilter();
    const sort = this.sortFilter();

    const result = this.restaurantService.restaurants().filter((restaurant) => {
      const matchesName = restaurant.name.toLowerCase().includes(name);
      const matchesCuisine = cuisine === 'all' || restaurant.cuisine === cuisine;
      const matchesStatus =
        status === 'all' ||
        (status === 'open' && restaurant.isActive) ||
        (status === 'closed' && !restaurant.isActive);
      return matchesName && matchesCuisine && matchesStatus;
    });

    return result.sort((a, b) => {
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
  });

  onNameChange(value: string) {
    this.nameFilter.set(value);
  }

  onCuisineChange(value: string) {
    this.cuisineFilter.set(value);
  }

  onStatusChange(value: string) {
    this.statusFilter.set(value);
  }

  onSortChange(value: string) {
    this.sortFilter.set(value);
  }

  resetFilters() {
    this.nameFilter.set('');
    this.cuisineFilter.set('all');
    this.statusFilter.set('all');
    this.sortFilter.set('rating');
  }
}