import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeRateModalComponent } from './charge-rate-modal.component';

describe('AddListOfInterestsComponent', () => {
  let component: ChargeRateModalComponent;
  let fixture: ComponentFixture<ChargeRateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChargeRateModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargeRateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
