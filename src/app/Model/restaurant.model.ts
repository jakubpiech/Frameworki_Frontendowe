export type Restaurant = {
  id: number;
  name: string;
  description: string;
  cuisine: string;
  imageUrl: string;
  rating: number;
  deliveryTimeMin: number;
  deliveryTimeMax: number;
  deliveryFee: number;
  minimumOrderValue: number;
  isActive: boolean;
  address: string;
  menuCategories: MenuCategory[];
};
export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isAvailable: boolean;
};
export type MenuCategory = {
  id: number;
  name: string;
  products: Product[];
};
