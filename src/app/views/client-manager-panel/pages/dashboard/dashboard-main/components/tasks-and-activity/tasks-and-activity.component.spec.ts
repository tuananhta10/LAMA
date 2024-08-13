import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksAndActivityComponent } from './tasks-and-activity.component';

describe('TasksAndActivityComponent', () => {
  let component: TasksAndActivityComponent;
  let fixture: ComponentFixture<TasksAndActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksAndActivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksAndActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
