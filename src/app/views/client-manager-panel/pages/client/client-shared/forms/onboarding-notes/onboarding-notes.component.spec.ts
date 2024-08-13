import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingNotesComponent} from './onboarding-notes.component';

describe('OnboardingNotesComponent', () => {
  let component: OnboardingNotesComponent;
  let fixture: ComponentFixture<OnboardingNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardingNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
