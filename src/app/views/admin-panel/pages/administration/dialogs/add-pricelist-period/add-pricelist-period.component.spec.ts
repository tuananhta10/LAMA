import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPricelistPeriodComponent } from './add-pricelist-period.component';

describe('AddPricelistPeriodComponent', () => {
  let component: AddPricelistPeriodComponent;
  let fixture: ComponentFixture<AddPricelistPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPricelistPeriodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPricelistPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
