import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientFundingComponent } from './client-funding.component';

describe('ClientFundingComponent', () => {
  let component: ClientFundingComponent;
  let fixture: ComponentFixture<ClientFundingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientFundingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientFundingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
