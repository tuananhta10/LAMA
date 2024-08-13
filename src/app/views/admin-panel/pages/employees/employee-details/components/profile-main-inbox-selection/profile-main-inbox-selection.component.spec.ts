import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMainInboxSelectionComponent } from './profile-main-inbox-selection.component';

describe('ProfileMainInboxSelectionComponent', () => {
  let component: ProfileMainInboxSelectionComponent;
  let fixture: ComponentFixture<ProfileMainInboxSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileMainInboxSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileMainInboxSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
