import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthCareProvidersModalComponent } from './health-care-providers-modal.component';

describe('HealthCareProvidersModalComponent', () => {
  let component: HealthCareProvidersModalComponent;
  let fixture: ComponentFixture<HealthCareProvidersModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthCareProvidersModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthCareProvidersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
