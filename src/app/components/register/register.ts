import { Component, inject, signal } from '@angular/core';
import { email,form, FormField, required } from '@angular/forms/signals';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  imports: [FormField],
  selector: 'app-register',
  styleUrl: './register.scss',
  templateUrl: './register.html',
})
export class Register {
  readonly #auth = inject(AuthService);
  readonly #router = inject(Router);
  errorMessage = signal('');
  model = signal({
    name: '',
    email: '',
    password: '',
    street: '',
    buildingNumber: '',
    city: '',
    postalCode: '',
  })
  registerForm = form(this.model,(schema)=>{
    required(schema.name,{message:'Name is required'});
    required(schema.email,{message:'Email is required'});
    email(schema.email,{message:'Email is invalid'});
    required(schema.password,{message:'Password is required'});
    required(schema.street,{message:'Street is required'});
    required(schema.buildingNumber,{message:'Building number is required'});
    required(schema.city,{message:'City is required'});
    required(schema.postalCode,{message:'Postal code is required'});
  })
  async onSubmit() {
    const isInvalid = this.registerForm().invalid();
    if (isInvalid) {
      this.errorMessage.set('Please fill in all required fields');
      return;
    }
    const data = this.model();
    const newUser = {
      name: data.name,
      email: data.email,
      password: data.password,
      deliveryAddress: {
        street: data.street,
        buildingNumber: data.buildingNumber,
        city: data.city,
        postalCode: data.postalCode,
      },
    };
    const success = await this.#auth.register(newUser);
    if (!success) {
      this.errorMessage.set('Registration failed')
      return;;
    }
    return this.#router.navigate(['/login']);
  }
}
