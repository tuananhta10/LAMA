import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalTemplatesComponent } from './goal-templates.component';

describe('GoalTemplatesComponent', () => {
  let component: GoalTemplatesComponent;
  let fixture: ComponentFixture<GoalTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoalTemplatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
