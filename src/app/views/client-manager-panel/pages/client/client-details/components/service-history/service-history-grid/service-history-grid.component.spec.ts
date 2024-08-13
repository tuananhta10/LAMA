import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceHistoryGridComponent } from './service-history-grid.component';

describe('ServiceHistoryGridComponent', () => {
  let component: ServiceHistoryGridComponent;
  let fixture: ComponentFixture<ServiceHistoryGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceHistoryGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceHistoryGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
