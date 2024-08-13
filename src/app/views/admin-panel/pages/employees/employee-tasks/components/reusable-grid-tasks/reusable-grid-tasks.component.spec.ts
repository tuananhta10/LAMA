import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableGridTasksComponent } from './reusable-grid-tasks.component';

describe('ReusableGridTasksComponent', () => {
  let component: ReusableGridTasksComponent;
  let fixture: ComponentFixture<ReusableGridTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReusableGridTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReusableGridTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
