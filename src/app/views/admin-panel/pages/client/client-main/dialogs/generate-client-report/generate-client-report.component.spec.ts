import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateClientReportComponent } from './generate-client-report.component';

describe('GenerateClientReportComponent', () => {
  let component: GenerateClientReportComponent;
  let fixture: ComponentFixture<GenerateClientReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateClientReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateClientReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
