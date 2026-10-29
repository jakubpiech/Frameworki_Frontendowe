import { Routes } from '@angular/router';
import { RestaurantList } from './components/restaurant-list/restaurant-list';
import { isAdminGuard } from './guards/is-admin-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'restaurants', pathMatch: 'full' },
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
    canActivateChild: [isAdminGuard],
    loadChildren: () => import('./admin.routes').then((m) => m.ADMIN_ROUTES),
  },
];
