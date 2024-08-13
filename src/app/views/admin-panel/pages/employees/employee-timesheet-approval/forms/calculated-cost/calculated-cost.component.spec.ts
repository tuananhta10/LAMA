import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatedCostComponent } from './calculated-cost.component';

describe('CalculatedCostComponent', () => {
  let component: CalculatedCostComponent;
  let fixture: ComponentFixture<CalculatedCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculatedCostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatedCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
