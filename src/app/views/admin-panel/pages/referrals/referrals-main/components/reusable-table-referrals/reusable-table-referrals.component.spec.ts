import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableTableReferralsComponent } from './reusable-table-referrals.component';

describe('ReusableTableReferralsComponent', () => {
  let component: ReusableTableReferralsComponent;
  let fixture: ComponentFixture<ReusableTableReferralsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReusableTableReferralsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReusableTableReferralsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
