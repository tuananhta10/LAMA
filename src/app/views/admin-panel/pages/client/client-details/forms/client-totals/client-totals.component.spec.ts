import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientTotalsComponent } from './client-totals.component';

describe('ClientTotalsComponent', () => {
  let component: ClientTotalsComponent;
  let fixture: ComponentFixture<ClientTotalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientTotalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientTotalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
