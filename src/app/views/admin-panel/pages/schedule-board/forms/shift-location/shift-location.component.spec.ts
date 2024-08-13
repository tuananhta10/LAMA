import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftLocationComponent } from './shift-location.component';

describe('ShiftLocationComponent', () => {
  let component: ShiftLocationComponent;
  let fixture: ComponentFixture<ShiftLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
