import { Service, signal } from '@angular/core';
import { Restaurant } from '../Model/restaurant.model';
import data from '../../data/restaurants.json';

@Service()
export class Restaurants {
  private data = signal(data as Restaurant[]);
  getAll() {
    return this.data();
  }
  getById(id: number) {
    {
      return this.data().find((restaurant) => restaurant.id === id);
    }
  }
}
