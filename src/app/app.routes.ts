import { Routes } from '@angular/router';

export const routes: Routes = [
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
];
