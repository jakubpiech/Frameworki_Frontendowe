import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminRestaurantList } from './admin-restaurant-list';

describe('AdminRestaurantList', () => {
  let component: AdminRestaurantList;
  let fixture: ComponentFixture<AdminRestaurantList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRestaurantList],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminRestaurantList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
