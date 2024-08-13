import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientClientDocumentsModalComponent } from './client-documents-modal.component';

describe('ClientDocumentsModalComponent', () => {
  let component: ClientDocumentsModalComponent;
  let fixture: ComponentFixture<ClientDocumentsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientDocumentsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDocumentsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
