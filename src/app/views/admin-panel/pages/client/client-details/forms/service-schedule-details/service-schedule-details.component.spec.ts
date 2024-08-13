import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceScheduleDetailsComponent } from './service-schedule-details.component';

describe('ServiceScheduleDetailsComponent', () => {
  let component: ServiceScheduleDetailsComponent;
  let fixture: ComponentFixture<ServiceScheduleDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceScheduleDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceScheduleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
