import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnassignWorkerScheduleComponent } from './unassign-worker-schedule.component';

describe('UnassignWorkerScheduleComponent', () => {
  let component: UnassignWorkerScheduleComponent;
  let fixture: ComponentFixture<UnassignWorkerScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnassignWorkerScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnassignWorkerScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
