import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeShiftSimpleComponent } from './add-employee-shift-simple.component';

describe('AddEmployeeShiftSimpleComponent', () => {
  let component: AddEmployeeShiftSimpleComponent;
  let fixture: ComponentFixture<AddEmployeeShiftSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmployeeShiftSimpleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmployeeShiftSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
