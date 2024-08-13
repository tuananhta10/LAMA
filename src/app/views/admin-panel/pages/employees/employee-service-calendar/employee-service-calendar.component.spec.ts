import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeServiceCalendarComponent } from './employee-service-calendar.component';

describe('EmployeeServiceCalendarComponent', () => {
  let component: EmployeeServiceCalendarComponent;
  let fixture: ComponentFixture<EmployeeServiceCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeServiceCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeServiceCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
