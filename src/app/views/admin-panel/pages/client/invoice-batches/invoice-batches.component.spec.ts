import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceBatchesComponent } from './invoice-batches.component';

describe('InvoiceBatchesComponent', () => {
  let component: InvoiceBatchesComponent;
  let fixture: ComponentFixture<InvoiceBatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceBatchesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceBatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
