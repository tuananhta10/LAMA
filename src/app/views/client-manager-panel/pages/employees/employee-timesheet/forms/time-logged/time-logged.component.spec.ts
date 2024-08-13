import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeLoggedComponent } from './time-logged.component';

describe('TimeLoggedComponent', () => {
  let component: TimeLoggedComponent;
  let fixture: ComponentFixture<TimeLoggedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeLoggedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeLoggedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
