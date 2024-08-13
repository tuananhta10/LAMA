import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewServiceScheduleComponent } from './view-service-schedule.component';

describe('ViewServiceScheduleComponent', () => {
  let component: ViewServiceScheduleComponent;
  let fixture: ComponentFixture<ViewServiceScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewServiceScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewServiceScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
