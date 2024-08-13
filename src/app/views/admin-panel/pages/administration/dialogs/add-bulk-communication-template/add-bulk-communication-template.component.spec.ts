import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBulkCommunicationTemplateComponent } from './add-bulk-communication-template.component';

describe('AddBulkCommunicationTemplateComponent', () => {
  let component: AddBulkCommunicationTemplateComponent;
  let fixture: ComponentFixture<AddBulkCommunicationTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBulkCommunicationTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBulkCommunicationTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
