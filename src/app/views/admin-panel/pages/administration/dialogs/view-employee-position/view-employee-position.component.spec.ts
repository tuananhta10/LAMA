import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmployeePositionComponent } from './view-employee-position.component';

describe('ViewEmployeePositionComponent', () => {
  let component: ViewEmployeePositionComponent;
  let fixture: ComponentFixture<ViewEmployeePositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEmployeePositionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEmployeePositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
