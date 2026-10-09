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
  allRestaurants = signal(data as Restaurant[]);
  displayedRestaurants = signal(this.allRestaurants());

  applyFilters() {
    const nameFilter = this.nameFilter().toLowerCase();
    const cuisineFilter = this.cuisineFilter();
    const statusFilter = this.statusFilter();
    const sortFilter = this.sortFilter();
    const result = this.allRestaurants().filter((restaurant) => {
      const matchesName = restaurant.name.toLowerCase().includes(nameFilter);
      const matchesCuisine = cuisineFilter === 'all' || restaurant.cuisine === cuisineFilter;
      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'open' && restaurant.isActive) ||
        (statusFilter === 'closed' && !restaurant.isActive);
      return matchesName && matchesCuisine && matchesStatus;
    });
    result.sort((a, b) => {
      if (sortFilter === 'rating') {
        return b.rating - a.rating;
      } else if (sortFilter === 'deliveryTime') {
        return a.deliveryTimeMin - b.deliveryTimeMin;
      } else if (sortFilter === 'deliveryCost') {
        return a.deliveryFee - b.deliveryFee;
      } else {
        return 0;
      }
    });
    this.displayedRestaurants.set(result);
  }
  onNameChange(value: string) {
    this.nameFilter.set(value);
    this.applyFilters();
  }

  onCuisineChange(value: string) {
    this.cuisineFilter.set(value);
    this.applyFilters();
  }
  onStatusChange(value: string) {
    this.statusFilter.set(value);
    this.applyFilters();
  }
  onSortChange(value: string) {
    this.sortFilter.set(value);
    this.applyFilters();
  }
  resetFilters() {
    this.nameFilter.set('');
    this.cuisineFilter.set('all');
    this.statusFilter.set('all');
    this.sortFilter.set('rating');
    this.applyFilters();
  }
  nameFilter = signal('');
  cuisineFilter = signal('all');
  statusFilter = signal('all');
  sortFilter = signal('rating');
}
