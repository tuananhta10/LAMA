import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCalendarComponent } from './service-calendar.component';

describe('ServiceCalendarComponent', () => {
  let component: ServiceCalendarComponent;
  let fixture: ComponentFixture<ServiceCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
