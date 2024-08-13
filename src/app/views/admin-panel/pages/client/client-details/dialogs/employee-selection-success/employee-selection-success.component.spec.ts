import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSelectionSuccessComponent } from './employee-selection-success.component';

describe('EmployeeSelectionSuccessComponent', () => {
  let component: EmployeeSelectionSuccessComponent;
  let fixture: ComponentFixture<EmployeeSelectionSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeSelectionSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSelectionSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
