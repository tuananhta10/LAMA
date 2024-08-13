import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSelectionConfirmationComponent } from './client-selection-confirmation.component';

describe('ClientSelectionConfirmationComponent', () => {
  let component: ClientSelectionConfirmationComponent;
  let fixture: ComponentFixture<ClientSelectionConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientSelectionConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSelectionConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
