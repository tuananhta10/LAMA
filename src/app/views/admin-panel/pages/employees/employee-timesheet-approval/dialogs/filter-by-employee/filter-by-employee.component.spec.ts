import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterByEmployeeComponent } from './filter-by-employee.component';

describe('FilterByEmployeeComponent', () => {
  let component: FilterByEmployeeComponent;
  let fixture: ComponentFixture<FilterByEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterByEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterByEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
