import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableTableClaimComponent } from './reusable-table-claim.component';

describe('ReusableTableClaimComponent', () => {
  let component: ReusableTableClaimComponent;
  let fixture: ComponentFixture<ReusableTableClaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReusableTableClaimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReusableTableClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
