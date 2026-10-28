import { Component, inject } from '@angular/core';
import { Restaurants } from '../../services/restaurants';
import { RouterLink } from '@angular/router';


@Component({
  imports: [RouterLink],
  selector: 'app-admin-restaurant-list',
  styleUrl: './admin-restaurant-list.scss',
  templateUrl: './admin-restaurant-list.html',
})
export class AdminRestaurantList {

  private restaurantService = inject(Restaurants);
  adminRestaurantList = this.restaurantService.restaurants
  onToggleActive(id:number){
    this.restaurantService.toggleActive(id)
  }
}
