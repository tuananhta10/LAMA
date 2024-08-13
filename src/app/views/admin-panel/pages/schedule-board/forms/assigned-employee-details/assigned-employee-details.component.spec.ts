import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedEmployeeDetailsComponent } from './assigned-employee-details.component';

describe('AssignedEmployeeDetailsComponent', () => {
  let component: AssignedEmployeeDetailsComponent;
  let fixture: ComponentFixture<AssignedEmployeeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignedEmployeeDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedEmployeeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
