import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSuccessModalComponent } from './client-success-modal.component';

describe('ClientSuccessModalComponent', () => {
  let component: ClientSuccessModalComponent;
  let fixture: ComponentFixture<ClientSuccessModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientSuccessModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSuccessModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
