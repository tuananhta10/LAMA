import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceAndLegalComponent } from './finance-and-legal.component';

describe('FinanceAndLegalComponent', () => {
  let component: FinanceAndLegalComponent;
  let fixture: ComponentFixture<FinanceAndLegalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinanceAndLegalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceAndLegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
