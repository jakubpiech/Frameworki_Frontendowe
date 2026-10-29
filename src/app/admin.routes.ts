import { Routes } from '@angular/router';
import { AdminRestaurantList } from './components/admin-restaurant-list/admin-restaurant-list';
import { AdminRestaurantForm } from './components/admin-restaurant-form/admin-restaurant-form';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'restaurants',

    children: [
      {
        path: '',
        component: AdminRestaurantList,
      },
      {
        path: 'new',
        component: AdminRestaurantForm,
      },
      {
        path: ':id/edit',
        component: AdminRestaurantForm,
      },
    ],
  },
];
