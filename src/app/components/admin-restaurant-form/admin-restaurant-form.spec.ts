import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminRestaurantForm } from './admin-restaurant-form';

describe('AdminRestaurantForm', () => {
  let component: AdminRestaurantForm;
  let fixture: ComponentFixture<AdminRestaurantForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRestaurantForm],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminRestaurantForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
