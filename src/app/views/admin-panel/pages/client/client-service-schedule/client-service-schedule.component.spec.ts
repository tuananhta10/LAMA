import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientServiceScheduleComponent } from './client-service-schedule.component';

describe('ClientServiceScheduleComponent', () => {
  let component: ClientServiceScheduleComponent;
  let fixture: ComponentFixture<ClientServiceScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientServiceScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientServiceScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
