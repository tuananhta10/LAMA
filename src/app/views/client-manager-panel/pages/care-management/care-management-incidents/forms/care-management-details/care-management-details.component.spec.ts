import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareManagementDetailsComponent } from './care-management-details.component';

describe('CareManagementDetailsComponent', () => {
  let component: CareManagementDetailsComponent;
  let fixture: ComponentFixture<CareManagementDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareManagementDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CareManagementDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
