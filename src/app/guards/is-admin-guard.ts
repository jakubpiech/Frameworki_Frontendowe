import { CanActivateChildFn } from '@angular/router';

export const isAdminGuard: CanActivateChildFn = (childRoute, state) => {
  return true;
};
