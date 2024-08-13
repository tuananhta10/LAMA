import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralsMainComponent } from './referrals-main.component';

describe('ReferralsMainComponent', () => {
  let component: ReferralsMainComponent;
  let fixture: ComponentFixture<ReferralsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferralsMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
