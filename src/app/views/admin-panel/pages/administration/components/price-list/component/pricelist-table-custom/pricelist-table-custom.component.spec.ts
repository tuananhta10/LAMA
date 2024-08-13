import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricelistTableCustomComponent } from './pricelist-table-custom.component';

describe('PricelistTableCustomComponent', () => {
  let component: PricelistTableCustomComponent;
  let fixture: ComponentFixture<PricelistTableCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PricelistTableCustomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PricelistTableCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
