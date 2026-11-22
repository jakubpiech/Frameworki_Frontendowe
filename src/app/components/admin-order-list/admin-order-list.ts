import { DecimalPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OrderService } from '../../services/order-service';
import { ORDER_STATUS, ORDER_STATUS_DISPLAY } from '../../Model/order.model';

@Component({
  imports: [DecimalPipe, RouterLink],
  selector: 'app-admin-order-list',
  styleUrl: './admin-order-list.scss',
  templateUrl: './admin-order-list.html',
})
export class AdminOrderList {
  readonly #order = inject(OrderService);
  statusLabels = ORDER_STATUS_DISPLAY;
  readonly statuses = ORDER_STATUS;

  statusFilter = signal('all');
  filteredOrders = computed(() => {
    const filter = this.statusFilter();
    const orders = this.#order.orders();

    if (filter === 'all') {
      return orders;
    }

    return orders.filter((order) => order.status === filter);
  });
  onStatusChange(status: string) {
    this.statusFilter.set(status);
  }
}
