import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceDetailsTableComponent } from './service-details-table.component';

describe('ServiceDetailsTableComponent', () => {
  let component: ServiceDetailsTableComponent;
  let fixture: ComponentFixture<ServiceDetailsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceDetailsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceDetailsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
