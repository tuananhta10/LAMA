import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelScheduleComponent } from './cancel-schedule.component';

describe('CancelScheduleComponent', () => {
  let component: CancelScheduleComponent;
  let fixture: ComponentFixture<CancelScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
