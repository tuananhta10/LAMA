import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPricelistRatesComponent } from './add-pricelist-rates.component';

describe('AddPricelistRatesComponent', () => {
  let component: AddPricelistRatesComponent;
  let fixture: ComponentFixture<AddPricelistRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPricelistRatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPricelistRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
