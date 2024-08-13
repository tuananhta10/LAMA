import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeShiftComponent } from './add-employee-shift.component';

describe('AddEmployeeShiftComponent', () => {
  let component: AddEmployeeShiftComponent;
  let fixture: ComponentFixture<AddEmployeeShiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmployeeShiftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmployeeShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
