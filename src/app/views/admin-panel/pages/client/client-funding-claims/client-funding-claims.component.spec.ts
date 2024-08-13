import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientFundingClaimsComponent } from './client-funding-claims.component';

describe('ClientFundingClaimsComponent', () => {
  let component: ClientFundingClaimsComponent;
  let fixture: ComponentFixture<ClientFundingClaimsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientFundingClaimsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientFundingClaimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
