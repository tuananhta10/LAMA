import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleBoardClientComponent } from './schedule-board-client.component';

describe('ScheduleBoardClientComponent', () => {
  let component: ScheduleBoardClientComponent;
  let fixture: ComponentFixture<ScheduleBoardClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleBoardClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleBoardClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
