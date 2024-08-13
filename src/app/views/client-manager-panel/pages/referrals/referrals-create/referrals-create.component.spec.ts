import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralsCreateComponent } from './referrals-create.component';

describe('ReferralsCreateComponent', () => {
  let component: ReferralsCreateComponent;
  let fixture: ComponentFixture<ReferralsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferralsCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
