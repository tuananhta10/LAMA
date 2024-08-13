import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePriceListComponent } from './update-price-list.component';

describe('UpdatePriceListComponent', () => {
  let component: UpdatePriceListComponent;
  let fixture: ComponentFixture<UpdatePriceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePriceListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePriceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
