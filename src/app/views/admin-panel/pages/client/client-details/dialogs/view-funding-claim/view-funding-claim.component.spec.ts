import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFundingClaimComponent } from './view-funding-claim.component';

describe('ViewFundingClaimComponent', () => {
  let component: ViewFundingClaimComponent;
  let fixture: ComponentFixture<ViewFundingClaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFundingClaimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFundingClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
