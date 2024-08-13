import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientClientFundingComponent } from './client-client-funding.component';

describe('ClientClientFundingComponent', () => {
  let component: ClientClientFundingComponent;
  let fixture: ComponentFixture<ClientClientFundingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientClientFundingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientClientFundingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
