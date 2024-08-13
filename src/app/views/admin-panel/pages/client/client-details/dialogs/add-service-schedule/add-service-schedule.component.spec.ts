import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServiceScheduleComponent } from './add-service-schedule.component';

describe('AddServiceScheduleComponent', () => {
  let component: AddServiceScheduleComponent;
  let fixture: ComponentFixture<AddServiceScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddServiceScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddServiceScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
