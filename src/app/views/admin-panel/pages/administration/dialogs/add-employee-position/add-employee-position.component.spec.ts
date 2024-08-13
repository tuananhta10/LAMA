import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeePositionComponent } from './add-employee-position.component';

describe('AddEmployeePositionComponent', () => {
  let component: AddEmployeePositionComponent;
  let fixture: ComponentFixture<AddEmployeePositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmployeePositionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmployeePositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
