import { Component, input, signal } from '@angular/core';
import { RestaurantWithoutId } from '../../Model/restaurant.model';
import { form,FormField } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';

@Component({
  imports: [FormField, RouterLink],
  selector: 'app-admin-restaurant-form',
  styleUrl: './admin-restaurant-form.scss',
  templateUrl: './admin-restaurant-form.html',
})
export class AdminRestaurantForm {
  id = input<string>();

  model = signal<RestaurantWithoutId>({
    name: '',
    description: '',
    cuisine: 'polish',
    imageUrl: '',
    deliveryTimeMin: 0,
    deliveryTimeMax: 0,
    deliveryFee: 0,
    minimumOrderValue: 0,
    isActive: false,
    address: ''
  });
  restaurantForm = form(this.model);
}
