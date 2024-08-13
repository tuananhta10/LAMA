import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClientScheduleListComponent } from './view-client-schedule-list.component';

describe('ViewClientScheduleListComponent', () => {
  let component: ViewClientScheduleListComponent;
  let fixture: ComponentFixture<ViewClientScheduleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewClientScheduleListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewClientScheduleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
