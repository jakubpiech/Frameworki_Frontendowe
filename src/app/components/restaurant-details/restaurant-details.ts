import { Component, computed, inject, input, signal } from '@angular/core';
import { Restaurants } from '../../services/restaurants';
import { Cuisine, Product } from '../../Model/restaurant.model';
import { MenuService } from '../../services/menu-service';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart-service';
import { AuthService } from '../../services/auth-service';

@Component({
  imports: [RouterLink],
  selector: 'app-restaurant-details',
  styleUrl: './restaurant-details.scss',
  templateUrl: './restaurant-details.html',
})
export class RestaurantDetails {
  readonly #cartService = inject(CartService);
  pendingProduct = signal<Product | null>(null);
  id = input<string>();
  private restaurantService = inject(Restaurants);

  restaurantDetails = computed(() => {
    const idNumber = Number(this.id());
    return this.restaurantService.getById(idNumber);
  });

  cuisine = input.required<Cuisine>();
  private menuService = inject(MenuService);

  menuCategories = computed(() => {
    const restaurant = this.restaurantDetails();
    if (!restaurant) {
      return [];
    }
    return this.menuService.getByCuisine(restaurant.cuisine);
  });
  addToCart(product: Product) {
    const restaurant = this.restaurantDetails();
    if (!restaurant) {
      return;
    }
    const added = this.#cartService.addProduct(restaurant.id, product);
    if (!added) {
      this.pendingProduct.set(product);
    }
  }
  cancelAdding() {
    this.pendingProduct.set(null);
  }
  replaceCart() {
    const product = this.pendingProduct();
    const restaurant = this.restaurantDetails();
    if (!product || !restaurant) {
      return;
    }
    this.#cartService.clear();
    this.#cartService.addProduct(restaurant.id, product);
    this.pendingProduct.set(null);
  }
}
