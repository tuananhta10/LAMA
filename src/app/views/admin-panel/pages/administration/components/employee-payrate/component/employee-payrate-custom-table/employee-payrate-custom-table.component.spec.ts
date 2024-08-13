import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePayrateCustomTableComponent } from './employee-payrate-custom-table.component';

describe('EmployeePayrateCustomTableComponent', () => {
  let component: EmployeePayrateCustomTableComponent;
  let fixture: ComponentFixture<EmployeePayrateCustomTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeePayrateCustomTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeePayrateCustomTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
