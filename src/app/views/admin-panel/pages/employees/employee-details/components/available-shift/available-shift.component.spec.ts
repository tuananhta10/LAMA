import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableShiftComponent } from './available-shift.component';

describe('AvailableShiftComponent', () => {
  let component: AvailableShiftComponent;
  let fixture: ComponentFixture<AvailableShiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableShiftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
