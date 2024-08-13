import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeBulkEmailNotificationComponent } from './employee-bulk-email-notification.component';

describe('EmployeeBulkEmailNotificationComponent', () => {
  let component: EmployeeBulkEmailNotificationComponent;
  let fixture: ComponentFixture<EmployeeBulkEmailNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeBulkEmailNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeBulkEmailNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
