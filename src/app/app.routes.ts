import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'restaurants', pathMatch:'full' },
  {
    path: 'restaurants',
    loadComponent: () =>
      import('./components/restaurant-list/restaurant-list').then((m) => m.RestaurantList),
  },
  {
    path: 'restaurants/:id',
    loadComponent: () =>
      import('./components/restaurant-details/restaurant-details').then((m) => m.RestaurantDetails),
  },
  {
    path: 'admin/restaurants',
    loadComponent: () =>
      import('./components/admin-restaurant-list/admin-restaurant-list').then(
        (m) => m.AdminRestaurantList
      ),
  },
];
