import { effect, Service, signal } from '@angular/core';
import { NewOrder, Order, OrderStatus } from '../Model/order.model';
function loadOrders(): Order[] {
  const saved = localStorage.getItem('orders');
  if (saved === null) {
    return [];
  }
  try {
    const parsed: unknown = JSON.parse(saved);
    if (Array.isArray(parsed)) {
      return parsed as Order[];
    }
  } catch {
    // Corrupted data in localStorage, start with an empty list.
  }
  return [];
}

@Service()
export class OrderService {
  readonly #orders = signal<Order[]>(loadOrders());
  readonly orders = this.#orders.asReadonly();
  readonly #persist = effect(() => {
    localStorage.setItem('orders', JSON.stringify(this.#orders()));
  });

  createOrder(input: NewOrder): Order {
    const order: Order = { ...input, id: crypto.randomUUID(), status: 'new' };
    this.#orders.update((oldOrders) => [...oldOrders, order]);
    return order;
  }
  getById(id: string): Order | undefined {
    return this.#orders().find((order) => order.id === id);
  }
  getByUserId(userId: string): Order[] {
    return this.#orders().filter((order) => order.userId === userId);
  }
  updateStatus(id: string, status: OrderStatus): boolean {
    const existing = this.#orders().find((order) => order.id === id);
    if (!existing) {
      return false;
    }
    this.#orders.update((orders) =>
      orders.map((order) => (order.id === id ? { ...order, status } : order)),
    );
    return true;
  }
}
