import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminUserForm } from './admin-user-form';

describe('AdminUserForm', () => {
  let component: AdminUserForm;
  let fixture: ComponentFixture<AdminUserForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUserForm],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminUserForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
