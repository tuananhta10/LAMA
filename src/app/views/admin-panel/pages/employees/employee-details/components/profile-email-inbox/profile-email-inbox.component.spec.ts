import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEmailInboxComponent } from './profile-email-inbox.component';

describe('ProfileEmailInboxComponent', () => {
  let component: ProfileEmailInboxComponent;
  let fixture: ComponentFixture<ProfileEmailInboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileEmailInboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEmailInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
