import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundingBudgetComponent } from './funding-budget.component';

describe('FundingBudgetComponent', () => {
  let component: FundingBudgetComponent;
  let fixture: ComponentFixture<FundingBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundingBudgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FundingBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
