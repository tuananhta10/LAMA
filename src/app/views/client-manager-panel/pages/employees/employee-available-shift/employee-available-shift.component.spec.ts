import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAvailableShiftComponent } from './employee-available-shift.component';

describe('EmployeeAvailableShiftComponent', () => {
  let component: EmployeeAvailableShiftComponent;
  let fixture: ComponentFixture<EmployeeAvailableShiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeAvailableShiftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAvailableShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
