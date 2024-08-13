import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignEmployeeFormComponent } from './assign-employee-form.component';

describe('AssignEmployeeFormComponent', () => {
  let component: AssignEmployeeFormComponent;
  let fixture: ComponentFixture<AssignEmployeeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignEmployeeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignEmployeeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
