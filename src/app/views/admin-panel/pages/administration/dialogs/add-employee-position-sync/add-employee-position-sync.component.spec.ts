import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeePositionSyncComponent } from './add-employee-position-sync.component';

describe('AddEmployeePositionSyncComponent', () => {
  let component: AddEmployeePositionSyncComponent;
  let fixture: ComponentFixture<AddEmployeePositionSyncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmployeePositionSyncComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmployeePositionSyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
