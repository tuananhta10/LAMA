import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsModalComponent } from './documents-modal.component';

describe('DocumentsModalComponent', () => {
  let component: DocumentsModalComponent;
  let fixture: ComponentFixture<DocumentsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
