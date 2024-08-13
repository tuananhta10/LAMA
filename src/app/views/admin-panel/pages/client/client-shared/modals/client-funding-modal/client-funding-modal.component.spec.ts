import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientFundingModalComponent } from './client-funding-modal.component';

describe('ClientFundingModalComponent', () => {
  let component: ClientFundingModalComponent;
  let fixture: ComponentFixture<ClientFundingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientFundingModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientFundingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
