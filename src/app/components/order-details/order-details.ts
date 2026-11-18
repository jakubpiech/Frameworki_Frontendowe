import { Component, computed, inject, input } from '@angular/core';
import { ORDER_STATUS, ORDER_STATUS_DISPLAY } from '../../Model/order.model';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { OrderService } from '../../services/order-service';

@Component({
  imports: [DecimalPipe, RouterLink],
  selector: 'app-order-details',
  styleUrl: './order-details.scss',
  templateUrl: './order-details.html',
})
export class OrderDetails {
  id = input<string>();
  readonly #auth = inject(AuthService);
  readonly #order = inject(OrderService);
  statusLabels = ORDER_STATUS_DISPLAY;
  statuses = ORDER_STATUS;
  readonly isAdmin = computed(() => this.#auth.currentUser()?.role === 'admin');
  readonly homeLink = computed(() => (this.isAdmin() ? '/admin/orders' : '/orders'));
  readonly order = computed(() => {
    const user = this.#auth.currentUser();
    const order = this.#order.getById(this.id() ?? '');
    if (!user || !order) {
      return undefined;
    }
    if (user.role === 'customer' && order.userId !== user.id) {
      return undefined;
    }
    return order;
  });
}
