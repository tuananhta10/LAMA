import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelTransportSettingsComponent } from './travel-transport-settings.component';

describe('TravelTransportSettingsComponent', () => {
  let component: TravelTransportSettingsComponent;
  let fixture: ComponentFixture<TravelTransportSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelTransportSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelTransportSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
