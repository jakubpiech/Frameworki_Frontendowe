import { Component, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-restaurant-card',
  styleUrl: './restaurant-card.scss',
  templateUrl: './restaurant-card.html',
})
export class RestaurantCard {
  Name = signal('Mak');
  restaurant = signal({
    name: 'Mak',
    description: 'Opis',
    cousine: 'Polska',
    image: 'https://picsum.photos/id/237/200/300',
    rating: '4.5',
    deliveryTime: '30 min',
    deliveryCost: '5 zł',
    isActive: "Active",
  });
}
