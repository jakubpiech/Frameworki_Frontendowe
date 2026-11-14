import { computed, inject, Service, signal } from '@angular/core';
import { Product } from '../Model/restaurant.model';
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
    return this.restaurant()?.deliveryFee ?? 0;
  });
  readonly orderPrice = computed(() => {
    return this.#items().reduce((sum, item) => sum + item.price * item.quantity, 0);
  });
  readonly totalToPay = computed(() => {
    return this.deliveryFee() + this.orderPrice();
  });
  readonly isCartEmpty = computed(() => {
    return this.#items().length === 0;
  });

  addProduct(restaurantId: number, product: Product): boolean {
    const currentId = this.restaurantId();
    if (currentId !== null && currentId !== restaurantId) {
      return false;
    }
    this.#restaurantId.set(restaurantId);
    const existing = this.#items().find((item) => item.productId === product.id);

    if (existing) {
      this.#items.update((items) =>
        items.map((item) =>
          item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      );
    } else {
      this.#items.update((items) => [
        ...items,
        { productId: product.id, name: product.name, price: product.price, quantity: 1 },
      ]);
    }
    return true;
  }
  setQuantity(productId: number, quantity: number) {
    if (!Number.isInteger(quantity) || quantity < 1) {
      return;
    }
    this.#items.update((items) =>
      items.map((item) => (item.productId === productId ? { ...item, quantity } : item)),
    );
  }
  removeProduct(productId: number) {
    this.#items.update((items) => items.filter((item) => item.productId !== productId));
    if(this.#items().length ===0){
      this.#restaurantId.set(null)
    }
  }
  clear(){
    this.#items.set([])
    this.#restaurantId.set(null);
  }
}
