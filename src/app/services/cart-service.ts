import { computed, inject, Service, signal } from '@angular/core';

import { CartItem } from '../Model/order.model';
import { Restaurants } from './restaurants';

@Service()
export class CartService {
  readonly #restaurants = inject(Restaurants);
  readonly #items = signal<CartItem[]>([]);
  readonly #restaurantId = signal<number | null>(null);

  readonly items = this.#items.asReadonly();
  readonly restaurantId = this.#restaurantId.asReadonly();

  readonly restaurant = computed(() => {
    const id = this.#restaurantId();
    if (id === null) {
      return undefined;
    }
    return this.#restaurants.getById(id);
  });

  readonly deliveryFee = computed(() => {
    const fee = this.restaurant()?.deliveryFee ?? 0;
  });
}
