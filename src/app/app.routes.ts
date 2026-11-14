import { Routes } from '@angular/router';
import { isAdminGuard } from './guards/is-admin-guard';
import { isLoggedInGuard } from './guards/is-logged-in-guard';
import { cartNotEmptyGuard } from './guards/cart-not-empty-guard';
import { OrderDetails } from './components/order-details/order-details';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'restaurants',
    pathMatch: 'full',
  },
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
    path: 'admin',
    loadComponent: () => import('./components/admin-panel/admin-panel').then((m) => m.AdminPanel),
    canActivate: [isAdminGuard],
    canActivateChild: [isAdminGuard],
    loadChildren: () => import('./admin.routes').then((m) => m.ADMIN_ROUTES),
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login').then((m) => m.Login),
  },
  {
    path: 'register',
    loadComponent: () => import('./components/register/register').then((m) => m.Register),
  },
  {
    path: 'profile',
    loadComponent: () => import('./components/profile/profile').then((m) => m.Profile),
    canActivate: [isLoggedInGuard],
  },
  {
    path: 'cart',
    loadComponent: () => import('./components/cart/cart').then((m) => m.Cart),
  },
  {
    path: 'checkout',
    loadComponent: () => import('./components/checkout/checkout').then((m) => m.Checkout),
    canActivate: [isLoggedInGuard, cartNotEmptyGuard],
  },
  {
    path: 'orders',
    loadComponent: () => import('./components/order-list/order-list').then((m) => m.OrderList),
    canActivate: [isLoggedInGuard],
    children: [
      {
        path: ':id',
        loadComponent: () =>
          import('./components/order-details/order-details').then((m) => m.OrderDetails),
        canActivate: [isLoggedInGuard],
      },
    ],
  },
];
