import { Routes } from '@angular/router';
import { AdminRestaurantList } from './components/admin-restaurant-list/admin-restaurant-list';
import { AdminRestaurantForm } from './components/admin-restaurant-form/admin-restaurant-form';
import { AdminUserList } from './components/admin-user-list/admin-user-list';
import { AdminUserForm } from './components/admin-user-form/admin-user-form';

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
  {
    path: 'users',
    children: [
      {
        path:'',
        component: AdminUserList,
      },
      {
        path: 'new',
        component: AdminUserForm,
      }
    ]
  }
];
