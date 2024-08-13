import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkCommunicationTemplateComponent } from './bulk-communication-template.component';

describe('BulkCommunicationTemplateComponent', () => {
  let component: BulkCommunicationTemplateComponent;
  let fixture: ComponentFixture<BulkCommunicationTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkCommunicationTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkCommunicationTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
