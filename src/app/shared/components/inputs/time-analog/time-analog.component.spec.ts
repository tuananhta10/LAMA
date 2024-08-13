import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeAnalogComponent } from './time-analog.component';

describe('TimeAnalogComponent', () => {
  let component: TimeAnalogComponent;
  let fixture: ComponentFixture<TimeAnalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeAnalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeAnalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
