import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareManagementPlanManagementBatchesComponent } from './care-management-plan-management-batches.component';

describe('CareManagementPlanManagementBatchesComponent', () => {
  let component: CareManagementPlanManagementBatchesComponent;
  let fixture: ComponentFixture<CareManagementPlanManagementBatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareManagementPlanManagementBatchesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CareManagementPlanManagementBatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
