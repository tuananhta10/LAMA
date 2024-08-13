import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAvailabilityManyComponent } from './employee-availability-many.component';

describe('EmployeeAvailabilityManyComponent', () => {
  let component: EmployeeAvailabilityManyComponent;
  let fixture: ComponentFixture<EmployeeAvailabilityManyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeAvailabilityManyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAvailabilityManyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
