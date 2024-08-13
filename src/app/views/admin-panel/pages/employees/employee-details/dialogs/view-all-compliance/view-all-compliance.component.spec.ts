import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllComplianceComponent } from './view-all-compliance.component';

describe('ViewAllComplianceComponent', () => {
  let component: ViewAllComplianceComponent;
  let fixture: ComponentFixture<ViewAllComplianceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllComplianceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllComplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
