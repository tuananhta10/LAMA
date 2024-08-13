import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateTimesheetReportComponent } from './generate-timesheet-report.component';

describe('GenerateTimesheetReportComponent', () => {
  let component: GenerateTimesheetReportComponent;
  let fixture: ComponentFixture<GenerateTimesheetReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateTimesheetReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateTimesheetReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
