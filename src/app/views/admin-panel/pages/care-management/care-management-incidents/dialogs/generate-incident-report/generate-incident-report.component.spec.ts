import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateIncidentReportComponent } from './generate-incident-report.component';

describe('GenerateIncidentReportComponent', () => {
  let component: GenerateIncidentReportComponent;
  let fixture: ComponentFixture<GenerateIncidentReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateIncidentReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateIncidentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
