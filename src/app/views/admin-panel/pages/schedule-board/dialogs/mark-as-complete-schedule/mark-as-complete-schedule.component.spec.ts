import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkAsCompleteScheduleComponent } from './mark-as-complete-schedule.component';

describe('MarkAsCompleteScheduleComponent', () => {
  let component: MarkAsCompleteScheduleComponent;
  let fixture: ComponentFixture<MarkAsCompleteScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkAsCompleteScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkAsCompleteScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
