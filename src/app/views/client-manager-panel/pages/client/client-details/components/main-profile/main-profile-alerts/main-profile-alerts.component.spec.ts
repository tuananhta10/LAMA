import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainProfileAlertsComponent } from './main-profile-alerts.component';

describe('MainProfileAlertsComponent', () => {
  let component: MainProfileAlertsComponent;
  let fixture: ComponentFixture<MainProfileAlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainProfileAlertsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainProfileAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
