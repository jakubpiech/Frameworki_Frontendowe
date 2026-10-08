export type Restaurant = {
  [x: string]: any;
  name: string;
  description: string;
  cuisine: string;
  imageUrl: string;
  rating: number;
  deliveryTimeMin: number;
  deliveryTimeMax: number;
  deliveryFee: number;
  isActive: boolean;
};
