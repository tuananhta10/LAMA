import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricelistModalComponent } from './pricelist-modal.component';

describe('PricelistModalComponent', () => {
  let component: PricelistModalComponent;
  let fixture: ComponentFixture<PricelistModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PricelistModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PricelistModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
