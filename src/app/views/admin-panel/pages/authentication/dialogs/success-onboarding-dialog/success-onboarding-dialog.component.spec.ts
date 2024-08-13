import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessOnboardingDialogComponent } from './success-onboarding-dialog.component';

describe('SuccessOnboardingDialogComponent', () => {
  let component: SuccessOnboardingDialogComponent;
  let fixture: ComponentFixture<SuccessOnboardingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessOnboardingDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessOnboardingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
