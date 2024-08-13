import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableTableShiftComponent } from './reusable-table-shift.component';

describe('ReusableTableShiftComponent', () => {
  let component: ReusableTableShiftComponent;
  let fixture: ComponentFixture<ReusableTableShiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReusableTableShiftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReusableTableShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
