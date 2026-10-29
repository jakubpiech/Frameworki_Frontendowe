import { Component, computed, inject, input, linkedSignal, signal } from '@angular/core';
import { CUISINES, RestaurantWithoutId } from '../../Model/restaurant.model';
import { form, FormField, min, minLength, required, validate } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { Restaurants } from '../../services/restaurants';

@Component({
  imports: [FormField, RouterLink],
  selector: 'app-admin-restaurant-form',
  styleUrl: './admin-restaurant-form.scss',
  templateUrl: './admin-restaurant-form.html',
})
export class AdminRestaurantForm {
  readonly cuisines = CUISINES;
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
  restaurantForm = form(this.model, (schema) => {
    required(schema.name, { message: 'Nazwa Restauracji jest wymagana' });
    required(schema.description, { message: 'Opis jest wymagany' });
    minLength(schema.description, 40, {
      error: { kind: 'minLength', message: 'Opis musi mieć conajmniej 40 znaków' },
    });
    min(schema.deliveryTimeMin, 0, { message: 'Czas dostawy nie może być mniejszy od 0' });
    validate(schema.deliveryTimeMax, ({ value, valueOf }) => {
      if (value() < valueOf(schema.deliveryTimeMin)) {
        return {
          kind: 'invalidDeliveryTime',
          message: 'Maksymalny czas dostawy nie może być mniejszy od minimalnego',
        };
      }
      return null;
    });
    min(schema.deliveryFee, 0, { message: 'Opłata za dostawe nie może być mniejsza od 0' });
    min(schema.minimumOrderValue, 0, {
      message: 'Minimalna kwota zamówienia nie może być mniejsza od 0',
    });
  });

  save() {
    if (this.restaurantForm().invalid()) {
      this.restaurantForm().markAsTouched();
      return;
    }
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
