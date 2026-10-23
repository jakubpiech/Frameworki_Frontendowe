import { Service, signal } from '@angular/core';
import { Restaurant } from '../Model/restaurant.model';
import data from '../../data/restaurants.json';

@Service()
export class Restaurants {
  readonly #restaurants = signal<Restaurant[]>(data as Restaurant[]);
  readonly restaurants = this.#restaurants.asReadonly();

  getById(id: number) {
    return this.#restaurants().find((restaurant) => restaurant.id === id);
  }
  toggleActive(id: number) {
    this.#restaurants.update((list) =>
      list.map((restaurant) =>
        restaurant.id === id ? { ...restaurant, isActive: !restaurant.isActive } : restaurant,
      ),
    );
  }
}
