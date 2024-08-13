import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareManagementNeedsAssessmentsComponent } from './care-management-needs-assessments.component';

describe('CareManagementNeedsAssessmentsComponent', () => {
  let component: CareManagementNeedsAssessmentsComponent;
  let fixture: ComponentFixture<CareManagementNeedsAssessmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareManagementNeedsAssessmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CareManagementNeedsAssessmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
