import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceTemplatesComponent } from './service-templates.component';

describe('ServiceTemplatesComponent', () => {
  let component: ServiceTemplatesComponent;
  let fixture: ComponentFixture<ServiceTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceTemplatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
