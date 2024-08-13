import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClientServiceScheduleComponent } from './add-client-service-schedule.component';

describe('AddClientServiceScheduleComponent', () => {
  let component: AddClientServiceScheduleComponent;
  let fixture: ComponentFixture<AddClientServiceScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddClientServiceScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClientServiceScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
