import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeListSimpleDetailDialogComponent } from './employee-list-simple-detail-dialog.component';

describe('EmployeeListSimpleDetailDialogComponent', () => {
  let component: EmployeeListSimpleDetailDialogComponent;
  let fixture: ComponentFixture<EmployeeListSimpleDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeListSimpleDetailDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeListSimpleDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
