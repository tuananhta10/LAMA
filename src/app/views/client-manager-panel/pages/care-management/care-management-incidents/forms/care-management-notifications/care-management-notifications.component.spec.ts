import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareManagementNotificationsComponent } from './care-management-notifications.component';

describe('CareManagementNotificationsComponent', () => {
  let component: CareManagementNotificationsComponent;
  let fixture: ComponentFixture<CareManagementNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareManagementNotificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CareManagementNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
