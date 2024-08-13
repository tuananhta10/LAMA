import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceDetailsSimpleComponent } from './service-details-simple.component';

describe('ServiceDetailsSimpleComponent', () => {
  let component: ServiceDetailsSimpleComponent;
  let fixture: ComponentFixture<ServiceDetailsSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceDetailsSimpleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceDetailsSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
