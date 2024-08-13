import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavePeriodsComponent } from './leave-periods.component';

describe('LeavePeriodsComponent', () => {
  let component: LeavePeriodsComponent;
  let fixture: ComponentFixture<LeavePeriodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeavePeriodsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeavePeriodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
