import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleBoardEmployeeComponent } from './schedule-board-employee.component';

describe('ScheduleBoardEmployeeComponent', () => {
  let component: ScheduleBoardEmployeeComponent;
  let fixture: ComponentFixture<ScheduleBoardEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleBoardEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleBoardEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
