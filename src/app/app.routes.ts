import { Routes } from '@angular/router';
import { RestaurantList } from './components/restaurant-list/restaurant-list';
import { isAdminGuard } from './guards/is-admin-guard';
import { isLoggedInGuard } from './guards/is-logged-in-guard';

export const routes: Routes = [

  {
    path: 'restaurants',
    component: RestaurantList,
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
  }
];
