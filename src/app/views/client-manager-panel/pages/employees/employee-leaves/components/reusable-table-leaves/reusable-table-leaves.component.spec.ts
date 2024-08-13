import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableTableLeavesComponent } from './reusable-table-leaves.component';

describe('ReusableTableLeavesComponent', () => {
  let component: ReusableTableLeavesComponent;
  let fixture: ComponentFixture<ReusableTableLeavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReusableTableLeavesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReusableTableLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
