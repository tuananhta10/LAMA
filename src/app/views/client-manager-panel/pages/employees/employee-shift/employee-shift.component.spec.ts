import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeShiftComponent } from './employee-shift.component';

describe('EmployeeShiftComponent', () => {
  let component: EmployeeShiftComponent;
  let fixture: ComponentFixture<EmployeeShiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeShiftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
