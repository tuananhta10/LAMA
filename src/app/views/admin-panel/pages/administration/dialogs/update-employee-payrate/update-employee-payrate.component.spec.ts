import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEmployeePayrateComponent } from './update-employee-payrate.component';

describe('UpdateEmployeePayrateComponent', () => {
  let component: UpdateEmployeePayrateComponent;
  let fixture: ComponentFixture<UpdateEmployeePayrateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateEmployeePayrateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEmployeePayrateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
