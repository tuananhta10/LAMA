import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePayrateComponent } from './employee-payrate.component';

describe('EmployeePayrateComponent', () => {
  let component: EmployeePayrateComponent;
  let fixture: ComponentFixture<EmployeePayrateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeePayrateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeePayrateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
