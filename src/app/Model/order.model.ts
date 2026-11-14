import { Product } from './restaurant.model';
import { Address } from './user-account.model';

export const ORDER_STATUS = [
  'new',
  'received',
  'preparing',
  'ready',
  'in_delivery',
  'delivered',
  'cancelled',
] as const;
export type OrderStatus = (typeof ORDER_STATUS)[number];
export const ORDER_STATUS_DISPLAY: Record<OrderStatus, string> = {
  new: 'Nowe',
  received: 'Zamówienie przyjęte',
  preparing: 'W trakcie przygotowania',
  ready: 'Zamówienie gotowe',
  in_delivery: 'W trakcie dostawy',
  delivered: 'Dostarczone',
  cancelled: 'Anulowane',
};
export type CartItem = {
  productId: number;
  name: string;
  price: number;
  quantity: number;
};
export const ORDER_PAYMENT_METHODS = ['cash', 'card'] as const;
export type OrderPaymentMethod = (typeof ORDER_PAYMENT_METHODS)[number];
export type Order = {
  id: string;
  userId: number;
  restaurantId: number;
  restaurantName: string;
  cartItems: CartItem[];
  status: OrderStatus;
  orderPrice: number;
  deliveryFee: number;
  totalToPay: number;
  userName: string;
  userSurname: string;
  email: string;
  phoneNumber: string;
  address: Address;
  paymentMethod: OrderPaymentMethod;
};
export type NewOrder = Omit<Order, 'id' | 'status'>;
