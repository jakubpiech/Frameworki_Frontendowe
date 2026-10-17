import { Component, computed, inject, input } from '@angular/core';
import { Restaurants } from '../../services/restaurants';
import { Cuisine } from '../../Model/restaurant.model';
import { MenuService } from '../../services/menu-service';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-restaurant-details',
  styleUrl: './restaurant-details.scss',
  templateUrl: './restaurant-details.html',
})
export class RestaurantDetails {
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
}
