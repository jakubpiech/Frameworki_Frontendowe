import { Component, inject, signal } from '@angular/core';
import { email, form, FormField, required } from '@angular/forms/signals';
import { UserService } from '../../services/user-service';
import { Router } from '@angular/router';

@Component({
  imports: [FormField],
  selector: 'app-admin-user-form',
  styleUrl: './admin-user-form.scss',
  templateUrl: './admin-user-form.html',
})
export class AdminUserForm {
  readonly #userService = inject(UserService);
  readonly #router = inject(Router);
  errorMessage = signal('');
  model = signal({
    name: '',
    email: '',
    password: '',
  });
  adminForm = form(this.model, (schema) => {
    required(schema.name, { message: 'Name is required' });
    required(schema.email, { message: 'Email is required' });
    email(schema.email, { message: 'Email is invalid' });
    required(schema.password, { message: 'Password is required' });
  });
  async onSubmit(event: Event) {
    event.preventDefault();
    const isInvalid = this.adminForm().invalid();
    if (isInvalid) {
      this.errorMessage.set('Please fill in all required fields');
      return;
    }
    const success = await this.#userService.createAdminAccount(this.model());
    if (!success) {
      this.errorMessage.set('Admin account creation failed');
      return;
    }
    return this.#router.navigate(['/admin/users']);
  }
}
