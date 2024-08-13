import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientFundingDetailsComponent } from './client-funding-details.component';

describe('ClientFundingDetailsComponent', () => {
  let component: ClientFundingDetailsComponent;
  let fixture: ComponentFixture<ClientFundingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientFundingDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientFundingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
