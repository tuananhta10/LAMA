import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveDeclineTimesheetComponent } from './approve-decline-timesheet.component';

describe('ApproveDeclineTimesheetComponent', () => {
  let component: ApproveDeclineTimesheetComponent;
  let fixture: ComponentFixture<ApproveDeclineTimesheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveDeclineTimesheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveDeclineTimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
