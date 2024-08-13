import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceAgreementTemplatesComponent } from './service-agreement-templates.component';

describe('ServiceAgreementTemplatesComponent', () => {
  let component: ServiceAgreementTemplatesComponent;
  let fixture: ComponentFixture<ServiceAgreementTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceAgreementTemplatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceAgreementTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
