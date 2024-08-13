import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAndActivityComponent } from './task-and-activity.component';

describe('TaskAndActivityComponent', () => {
  let component: TaskAndActivityComponent;
  let fixture: ComponentFixture<TaskAndActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskAndActivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskAndActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
