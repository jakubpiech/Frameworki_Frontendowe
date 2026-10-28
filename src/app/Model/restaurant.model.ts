export type Restaurant = {
  id: number;
  name: string;
  description: string;
  cuisine: Cuisine;
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
export type RestaurantWithoutId = Omit<Restaurant,'id'|'rating'|'menuCategories'>;
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
  cuisine: Cuisine;
  products: Product[];
};
export type Cuisine = 'polish' | 'italian' | 'thai' | 'american' | 'chinese';
