import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableTableSupportComponent } from './reusable-table-support.component';

describe('ReusableTableSupportComponent', () => {
  let component: ReusableTableSupportComponent;
  let fixture: ComponentFixture<ReusableTableSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReusableTableSupportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReusableTableSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
