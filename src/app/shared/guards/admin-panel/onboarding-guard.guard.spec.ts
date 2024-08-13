import { TestBed } from '@angular/core/testing';

import { OnboardingGuardGuard } from './onboarding-guard.guard';

describe('OnboardingGuardGuard', () => {
  let guard: OnboardingGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OnboardingGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
