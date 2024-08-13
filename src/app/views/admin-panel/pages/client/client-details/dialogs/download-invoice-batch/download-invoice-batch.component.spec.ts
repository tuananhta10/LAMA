import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadInvoiceBatchComponent } from './download-invoice-batch.component';

describe('PrintInvoiceBatchComponent', () => {
  let component: PrintInvoiceBatchComponent;
  let fixture: ComponentFixture<PrintInvoiceBatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintInvoiceBatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintInvoiceBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
