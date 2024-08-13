import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSelectionConfirmationComponent } from './employee-selection-confirmation.component';

describe('EmployeeSelectionConfirmationComponent', () => {
  let component: EmployeeSelectionConfirmationComponent;
  let fixture: ComponentFixture<EmployeeSelectionConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeSelectionConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSelectionConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
