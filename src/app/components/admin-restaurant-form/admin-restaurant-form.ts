import { Component, computed, inject, input, linkedSignal, signal } from '@angular/core';
import { RestaurantWithoutId } from '../../Model/restaurant.model';
import { form, FormField, required } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { Restaurants } from '../../services/restaurants';

@Component({
  imports: [FormField, RouterLink],
  selector: 'app-admin-restaurant-form',
  styleUrl: './admin-restaurant-form.scss',
  templateUrl: './admin-restaurant-form.html',
})
export class AdminRestaurantForm {
  errorMessage = signal('');
  readonly #restaurantService = inject(Restaurants);
  readonly #router = inject(Router);
  id = input<string>();
  restaurantToEdit = computed(() => {
    const idFromUrl = this.id();
    if (idFromUrl === undefined) {
      return undefined;
    }
    return this.#restaurantService.getById(Number(idFromUrl));
  });

  model = linkedSignal<RestaurantWithoutId>(() => {
    const restaurant = this.restaurantToEdit();
    if (restaurant !== undefined) {
      return {
        name: restaurant.name,
        description: restaurant.description,
        cuisine: restaurant.cuisine,
        imageUrl: restaurant.imageUrl,
        deliveryTimeMin: restaurant.deliveryTimeMin,
        deliveryTimeMax: restaurant.deliveryTimeMax,
        deliveryFee: restaurant.deliveryFee,
        minimumOrderValue: restaurant.minimumOrderValue,
        isActive: restaurant.isActive,
        address: restaurant.address,
      };
    }
    return {
      name: '',
      description: '',
      cuisine: 'polish',
      imageUrl: '',
      deliveryTimeMin: 0,
      deliveryTimeMax: 0,
      deliveryFee: 0,
      minimumOrderValue: 0,
      isActive: false,
      address: '',
    };
  });
  restaurantForm = form(this.model);

  save() {
    const idFromUrl = this.id();
    if (idFromUrl === undefined) {
      this.#restaurantService.add(this.model());
    } else {
      const wasUpdated = this.#restaurantService.update(Number(idFromUrl), this.model());
      if (!wasUpdated) {
        this.errorMessage.set('Restauracja o takim id nie istnieje');
        return;
      }
    }

    this.#router.navigateByUrl('/admin/restaurants');
  }
}
