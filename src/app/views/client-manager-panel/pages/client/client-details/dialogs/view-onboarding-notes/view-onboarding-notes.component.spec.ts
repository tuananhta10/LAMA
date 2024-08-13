import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOnboardingNotesComponent } from './view-onboarding-notes.component';

describe('ViewOnboardingNotesComponent', () => {
  let component: ViewOnboardingNotesComponent;
  let fixture: ComponentFixture<ViewOnboardingNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewOnboardingNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOnboardingNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
