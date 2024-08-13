import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStripePaymentMethodComponent } from './add-stripe-payment-method.component';

describe('AddStripePaymentMethodComponent', () => {
  let component: AddStripePaymentMethodComponent;
  let fixture: ComponentFixture<AddStripePaymentMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStripePaymentMethodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStripePaymentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
