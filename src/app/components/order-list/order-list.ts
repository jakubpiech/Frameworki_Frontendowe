import { Component, computed, inject } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { OrderService } from '../../services/order-service';
import { ORDER_STATUS_DISPLAY } from '../../Model/order.model';
import { DecimalPipe } from '@angular/common';

@Component({
  imports: [RouterOutlet, RouterLinkWithHref, DecimalPipe],
  selector: 'app-order-list',
  styleUrl: './order-list.scss',
  templateUrl: './order-list.html',
})
export class OrderList {
  readonly #auth = inject(AuthService);
  readonly #order = inject(OrderService);
  statusLabels = ORDER_STATUS_DISPLAY;

  readonly orders = computed(() => {
    const user = this.#auth.currentUser();
    if (!user) {
      return [];
    }
    return this.#order.getByUserId(user.id);
  });
}
