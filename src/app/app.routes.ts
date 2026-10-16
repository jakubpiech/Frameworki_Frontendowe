import { Routes } from '@angular/router';
import { RestaurantList } from './components/restaurant-list/restaurant-list';
import { RestaurantDetails } from './components/restaurant-details/restaurant-details';

export const routes: Routes = [
  {
    path: 'restaurants',
    component: RestaurantList,
  },
  {
    path: 'restaurants/:id',
    component: RestaurantDetails,
  },
];
