import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeBulkSmsNotificationComponent } from './employee-bulk-sms-notification.component';

describe('EmployeeBulkSmsNotificationComponent', () => {
  let component: EmployeeBulkSmsNotificationComponent;
  let fixture: ComponentFixture<EmployeeBulkSmsNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeBulkSmsNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeBulkSmsNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
