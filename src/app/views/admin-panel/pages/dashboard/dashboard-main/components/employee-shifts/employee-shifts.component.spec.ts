import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeShiftsComponent } from './employee-shifts.component';

describe('EmployeeShiftsComponent', () => {
  let component: EmployeeShiftsComponent;
  let fixture: ComponentFixture<EmployeeShiftsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeShiftsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeShiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
