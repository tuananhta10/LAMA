import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateInvoiceBatchComponent } from './generate-invoice-batch.component';

describe('GenerateInvoiceBatchComponent', () => {
  let component: GenerateInvoiceBatchComponent;
  let fixture: ComponentFixture<GenerateInvoiceBatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateInvoiceBatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateInvoiceBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
