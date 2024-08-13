import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSuccessModalComponent } from './employee-success-modal.component';

describe('EmployeeSuccessModalComponent', () => {
  let component: EmployeeSuccessModalComponent;
  let fixture: ComponentFixture<EmployeeSuccessModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeSuccessModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeSuccessModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
