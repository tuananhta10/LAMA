import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareManagementSupportCoordinationComponent } from './care-management-support-coordination.component';

describe('CareManagementSupportCoordinationComponent', () => {
  let component: CareManagementSupportCoordinationComponent;
  let fixture: ComponentFixture<CareManagementSupportCoordinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareManagementSupportCoordinationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CareManagementSupportCoordinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
