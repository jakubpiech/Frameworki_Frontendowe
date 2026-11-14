import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CartService } from '../services/cart-service';

export const cartNotEmptyGuard: CanActivateFn = (route, state) => {
const cart = inject(CartService)
const router = inject(Router)
  
if(cart.isCartEmpty()){
  return router.createUrlTree(['/cart'])
}  


  return true;
};
