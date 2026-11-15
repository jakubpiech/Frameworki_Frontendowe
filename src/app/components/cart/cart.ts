import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart-service';
import { DecimalPipe } from '@angular/common';

@Component({
  imports: [RouterLink, DecimalPipe],
  selector: 'app-cart',
  styleUrl: './cart.scss',
  templateUrl: './cart.html',
})
export class Cart {
  readonly #cartService = inject(CartService);
  readonly items = this.#cartService.items;
  readonly deliveryFee = this.#cartService.deliveryFee;
  readonly orderPrice = this.#cartService.orderPrice;
  readonly totalToPay = this.#cartService.totalToPay;
  readonly isCartEmpty = this.#cartService.isCartEmpty;

  setQuantity(productId: number, quantity: number) {
    this.#cartService.setQuantity(productId, quantity);
  }
  onQuantityInput(productId: number, value: string) {
    this.#cartService.setQuantity(productId, Number(value));
  }
  remove(productId: number) {
    this.#cartService.removeProduct(productId);
  }
}
