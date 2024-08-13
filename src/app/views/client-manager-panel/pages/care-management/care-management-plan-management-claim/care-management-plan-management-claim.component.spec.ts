import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareManagementPlanManagementClaimComponent } from './care-management-plan-management-claim.component';

describe('CareManagementPlanManagementClaimComponent', () => {
  let component: CareManagementPlanManagementClaimComponent;
  let fixture: ComponentFixture<CareManagementPlanManagementClaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareManagementPlanManagementClaimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CareManagementPlanManagementClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
