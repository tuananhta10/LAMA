import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDocumentModalComponent } from './custom-document-modal.component';

describe('CustomDocumentModalComponent', () => {
  let component: CustomDocumentModalComponent;
  let fixture: ComponentFixture<CustomDocumentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomDocumentModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomDocumentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
