import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSignupOnboardingComponent } from './client-signup-onboarding.component';

describe('ClientSignupOnboardingComponent', () => {
  let component: ClientSignupOnboardingComponent;
  let fixture: ComponentFixture<ClientSignupOnboardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientSignupOnboardingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSignupOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
