import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceTemplateModalComponent } from './service-template-modal.component';

describe('ServiceTemplateModalComponent', () => {
  let component: ServiceTemplateModalComponent;
  let fixture: ComponentFixture<ServiceTemplateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceTemplateModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceTemplateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
