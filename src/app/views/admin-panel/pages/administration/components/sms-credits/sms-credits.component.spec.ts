import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsCreditsComponent } from './sms-credits.component';

describe('SmsCreditsComponent', () => {
  let component: SmsCreditsComponent;
  let fixture: ComponentFixture<SmsCreditsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmsCreditsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsCreditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
