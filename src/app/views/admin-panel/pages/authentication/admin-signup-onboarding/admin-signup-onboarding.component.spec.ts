import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSignupOnboardingComponent } from './admin-signup-onboarding.component';

describe('AdminSignupOnboardingComponent', () => {
  let component: AdminSignupOnboardingComponent;
  let fixture: ComponentFixture<AdminSignupOnboardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSignupOnboardingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSignupOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
