import { Service, signal } from '@angular/core';
import { Restaurant, RestaurantWithoutId } from '../Model/restaurant.model';
import data from '../../data/restaurants.json';

@Service()
export class Restaurants {
  readonly #restaurants = signal<Restaurant[]>(data as Restaurant[]);
  readonly restaurants = this.#restaurants.asReadonly();

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
