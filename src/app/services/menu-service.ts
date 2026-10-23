import { Service, signal } from '@angular/core';
import { Cuisine, MenuCategory } from '../Model/restaurant.model';
import menuCategories from '../../data/menu.json';

@Service()
export class MenuService {
  private menuCategories = signal(menuCategories as MenuCategory[]);
  getAll() {
    return this.menuCategories();
  }
  getByCuisine(cuisine: Cuisine) {
    return this.menuCategories().filter((category) => category.cuisine === cuisine);
  }
 
}
