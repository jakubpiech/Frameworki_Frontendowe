import { Component, inject, signal } from '@angular/core';
import { email, form, FormField, pattern, required } from '@angular/forms/signals';
import { OrderService } from '../../services/order-service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { CartService } from '../../services/cart-service';
import { ORDER_PAYMENT_METHODS } from '../../Model/order.model';

@Component({
  imports: [FormField],
  selector: 'app-checkout',
  styleUrl: './checkout.scss',
  templateUrl: './checkout.html',
})
export class Checkout {
  readonly #order = inject(OrderService);
  readonly #router = inject(Router);
  readonly #auth = inject(AuthService);
  readonly #cart = inject(CartService);
  errorMessage = signal<string | null>(null);
  model = signal({
    userName: '',
    userSurname: '',
    email: '',
    phoneNumber: '',
    street: '',
    buildingNumber: '',
    apartmentNumber: '',
    postalCode: '',
    city: '',
    paymentMethod: '',
  });
  orderForm = form(this.model, (schema) => {
    required(schema.userName, { message: 'Name is Required' });
    required(schema.userSurname, { message: 'Surname is Required' });
    required(schema.email, { message: 'Email is Required' });
    required(schema.phoneNumber, { message: 'Phone number is Required' });
    required(schema.street, { message: 'Street is Required' });
    required(schema.buildingNumber, { message: 'Building number is Required' });
    required(schema.postalCode, { message: 'Postal Code is Required' });
    required(schema.city, { message: 'City is Required' });
    required(schema.paymentMethod, { message: 'Payment method is Required' });
    email(schema.email, { message: 'Email is invalid' });
    pattern(schema.phoneNumber, /^\+?[0-9]{9,12}$/, { message: 'Phone number is invalid' });
  });
  onSubmit(event: Event) {
    event.preventDefault();
    this.errorMessage.set('');
    if (this.orderForm().invalid()) {
      this.errorMessage.set('Please fill all required fields');
      return;
    }

    const user = this.#auth.currentUser();
    const restaurant = this.#cart.restaurant();
    const emptyCart = this.#cart.isCartEmpty();
    if (!user || !restaurant || emptyCart) {
      return;
    }
    const data = this.model();
    const paymentMethod = ORDER_PAYMENT_METHODS.find((item) => item === data.paymentMethod);
    if (!paymentMethod) {
      this.errorMessage.set('Wybierz metode płatności');
      return;
    }

    this.#order.createOrder({
      userId: user.id,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      cartItems: this.#cart.items(),
      orderPrice: this.#cart.orderPrice(),
      deliveryFee: this.#cart.deliveryFee(),
      totalToPay: this.#cart.totalToPay(),
      userName: data.userName,
      userSurname: data.userSurname,
      email: data.email,
      phoneNumber: data.phoneNumber,
      paymentMethod: paymentMethod,
      address: {
        street: data.street,
        apartmentNumber: data.apartmentNumber,
        buildingNumber: data.buildingNumber,
        postalCode: data.postalCode,
        city: data.city,
      },
    });

    this.#cart.clear();
    this.#router.navigateByUrl('/orders');
  }
}
