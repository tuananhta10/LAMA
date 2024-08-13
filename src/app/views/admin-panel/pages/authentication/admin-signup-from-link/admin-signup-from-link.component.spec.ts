import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSignupFromLinkComponent } from './admin-signup-from-link.component';

describe('AdminSignupFromLinkComponent', () => {
  let component: AdminSignupFromLinkComponent;
  let fixture: ComponentFixture<AdminSignupFromLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSignupFromLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSignupFromLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
