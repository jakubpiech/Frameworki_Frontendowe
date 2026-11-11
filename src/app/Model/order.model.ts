export const ORDER_STATUS = ['new', 'received', 'preparing', 'ready', 'in_delivery', 'delivered', 'cancelled'] as const;
export type OrderStatus = (typeof ORDER_STATUS)[number];
export const ORDER_STATUS_DISPLAY: Record<OrderStatus, string>={
    new: 'Nowe',
    received: 'Zamówienie przyjęte',
    preparing: 'W trakcie przygotowania',
    ready: 'Zamówienie gotowe',
    in_delivery: 'W trakcie dostawy',
    delivered: 'Dostarczone',
    cancelled: 'Anulowane'
}