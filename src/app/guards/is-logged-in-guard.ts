import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';

export const isLoggedInGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.isSessionValid() && auth.currentUser() !== null) {
    return true;
  } else {
    return router.createUrlTree(['/login']);
  }
};
