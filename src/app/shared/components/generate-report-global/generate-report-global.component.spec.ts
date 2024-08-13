import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateReportGlobalComponent } from './generate-report-global.component';

describe('GenerateReportGlobalComponent', () => {
  let component: GenerateReportGlobalComponent;
  let fixture: ComponentFixture<GenerateReportGlobalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateReportGlobalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateReportGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
