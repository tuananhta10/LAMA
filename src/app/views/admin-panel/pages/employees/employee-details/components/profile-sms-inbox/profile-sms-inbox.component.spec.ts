import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSmsInboxComponent } from './profile-sms-inbox.component';

describe('ProfileSmsInboxComponent', () => {
  let component: ProfileSmsInboxComponent;
  let fixture: ComponentFixture<ProfileSmsInboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileSmsInboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSmsInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
