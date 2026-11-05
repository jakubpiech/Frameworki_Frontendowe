import { CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';

export const isAdminGuard: CanActivateChildFn = (childRoute, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if(!auth.isSessionValid()|| auth.currentUser()=== null){
    return router.createUrlTree(['/login']);
  }
  if(auth.currentUser()?.role !== 'admin'){
    return router.createUrlTree(['/restaurants']);
  }
  return true;
};
