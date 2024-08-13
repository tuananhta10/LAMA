import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyContactModalComponent } from './emergency-contact-modal.component';

describe('EmergencyContactModalComponent', () => {
  let component: EmergencyContactModalComponent;
  let fixture: ComponentFixture<EmergencyContactModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmergencyContactModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergencyContactModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
