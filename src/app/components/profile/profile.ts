import { Component, computed, inject, linkedSignal, signal } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { RouterLink } from '@angular/router';
import { email, form, FormField, required } from '@angular/forms/signals';

@Component({
  imports: [FormField, RouterLink],
  selector: 'app-profile',
  styleUrl: './profile.scss',
  templateUrl: './profile.html',
})
export class Profile {
  readonly #auth = inject(AuthService);
  errorMessage = signal('');
  successMessage = signal('');
  isCustomer = computed(() => this.#auth.currentUser()?.role === 'customer');
  model = linkedSignal(() => {
    const user = this.#auth.currentUser();
    return {
      name: user?.name ?? '',
      email: user?.email ?? '',
      street: user?.role === 'customer' ? user.deliveryAddress.street : '',
      buildingNumber: user?.role === 'customer' ? user.deliveryAddress.buildingNumber : '',
      city: user?.role === 'customer' ? user.deliveryAddress.city : '',
      postalCode: user?.role === 'customer' ? user.deliveryAddress.postalCode : '',
    };
  });
  profileForm = form(this.model, (schema) => {
    required(schema.name, { message: 'Name is required' });
    required(schema.email, { message: 'Email is required' });
    email(schema.email, { message: 'Email is invalid' });
    if (this.isCustomer()) {
      required(schema.street, { message: 'Street is required' });
      required(schema.buildingNumber, { message: 'Building number is required' });
      required(schema.city, { message: 'City is required' });
      required(schema.postalCode, { message: 'Postal code is required' });
    }
  });
  onSubmit(event: Event) {
    event.preventDefault();
    const isInvalid = this.profileForm().invalid();
    if (isInvalid) {
      this.successMessage.set('');
      this.errorMessage.set('Please fill in all required fields');
      return;
    }

    const user = this.#auth.currentUser();
    if (!user) {
      this.successMessage.set('');
      this.errorMessage.set('User not found');
      return;
    }

    const data = this.model();
    let success = false;

    if (user.role === 'customer') {
      success = this.#auth.updateOwnProfile({
        name: data.name,
        email: data.email,
        deliveryAddress: {
          ...user.deliveryAddress,
          street: data.street,
          buildingNumber: data.buildingNumber,
          postalCode: data.postalCode,
          city: data.city,
        },
      });
    } else {
      success = this.#auth.updateOwnProfile({
        name: data.name,
        email: data.email,
      });
    }

    if (!success) {
      this.successMessage.set('');
      this.errorMessage.set('Profile update failed');
      return;
    }

    this.errorMessage.set('');
    this.successMessage.set('Profile updated successfully');
  }
}
