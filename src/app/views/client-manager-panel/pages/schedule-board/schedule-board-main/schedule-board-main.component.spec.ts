import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleBoardMainComponent } from './schedule-board-main.component';

describe('ScheduleBoardMainComponent', () => {
  let component: ScheduleBoardMainComponent;
  let fixture: ComponentFixture<ScheduleBoardMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleBoardMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleBoardMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
