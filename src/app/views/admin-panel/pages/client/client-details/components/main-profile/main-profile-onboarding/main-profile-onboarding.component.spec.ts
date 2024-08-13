import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainProfileOnboardingComponent } from './main-profile-onboarding.component';

describe('MainProfileOnboardingComponent', () => {
  let component: MainProfileOnboardingComponent;
  let fixture: ComponentFixture<MainProfileOnboardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainProfileOnboardingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainProfileOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
