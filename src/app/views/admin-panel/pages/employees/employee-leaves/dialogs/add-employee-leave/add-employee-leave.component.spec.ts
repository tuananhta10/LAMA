import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeLeaveComponent } from './add-employee-leave.component';

describe('AddEmployeeLeaveComponent', () => {
  let component: AddEmployeeLeaveComponent;
  let fixture: ComponentFixture<AddEmployeeLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmployeeLeaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmployeeLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
