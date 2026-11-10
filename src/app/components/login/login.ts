import { Component, inject, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  imports: [FormField],
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class Login {
  readonly #auth = inject(AuthService);
  readonly #router = inject(Router);
  errorMessage = signal('');
  model = signal({
    email: '',
    password: '',
  });
  loginForm = form(this.model, (schema) => {
    required(schema.email, { message: 'Email is required' });
    required(schema.password, { message: 'Password is required' });
  });

  async onSubmit(event: Event) {
    event.preventDefault();
    const isInvalid = this.loginForm().invalid();
    if (isInvalid) {
      this.errorMessage.set('Please fill in all required fields');
      return;
    }
    this.errorMessage.set('');
    const loggedIn = await this.#auth.login(this.model().email, this.model().password);
    if (loggedIn) {
      return this.#router.navigate(['/restaurants']);
    }
    return this.errorMessage.set('Invalid email or password');
  }
}
