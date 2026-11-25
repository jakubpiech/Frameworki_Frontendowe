import { effect, inject, Service, signal } from '@angular/core';
import { Restaurant, RestaurantWithoutId } from '../Model/restaurant.model';
import { HttpClient } from '@angular/common/http';
import { loadStatus } from '../Model/loading.model';
import { API_URL } from '../api-url';

@Service()
export class Restaurants {
  readonly #http = inject(HttpClient);
  readonly #loading = signal<loadStatus>('Loading');
  readonly #restaurants = signal<Restaurant[]>([]);
  readonly loading = this.#loading.asReadonly();
  readonly restaurants = this.#restaurants.asReadonly();

  load() {
    this.#loading.set('Loading');

    this.#http.get<Restaurant[]>(`${API_URL}/restaurants`).subscribe({
      next: (data) => {
        if (data.length === 0) {
          this.#loading.set('Empty');
          return;
        }
        this.#restaurants.set(data);
        this.#loading.set('Success');
      },
      error: () => {
        this.#loading.set('Error');
      },
    });
  }
  getById(id: number) {
    return this.#restaurants().find((restaurant) => restaurant.id === id);
  }

  add(input: RestaurantWithoutId) {
    this.#restaurants.update((list) => {
      const ids = list.map((r) => r.id);
      const biggestId = Math.max(...ids, 0);
      const nextId = biggestId + 1;
      return [...list, { ...input, id: nextId, rating: 0, menuCategories: [] }];
    });
  }
  update(id: number, input: RestaurantWithoutId) {
    const existingRestaurant = this.getById(id);
    if (existingRestaurant === undefined) {
      return false;
    }
    this.#restaurants.update((list) =>
      list.map((restaurant) => (restaurant.id === id ? { ...restaurant, ...input } : restaurant)),
    );
    return true;
  }
  toggleActive(id: number) {
    this.#restaurants.update((list) =>
      list.map((restaurant) =>
        restaurant.id === id ? { ...restaurant, isActive: !restaurant.isActive } : restaurant,
      ),
    );
  }
}
