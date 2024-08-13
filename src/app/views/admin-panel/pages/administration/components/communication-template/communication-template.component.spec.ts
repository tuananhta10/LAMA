import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunicationTemplateComponent } from './communication-template.component';

describe('CommunicationTemplateComponent', () => {
  let component: CommunicationTemplateComponent;
  let fixture: ComponentFixture<CommunicationTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunicationTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunicationTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
