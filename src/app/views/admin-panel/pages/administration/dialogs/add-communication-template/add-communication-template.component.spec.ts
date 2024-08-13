import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCommunicationTemplateComponent } from './add-communication-template.component';

describe('AddCommunicationTemplateComponent', () => {
  let component: AddCommunicationTemplateComponent;
  let fixture: ComponentFixture<AddCommunicationTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCommunicationTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCommunicationTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
