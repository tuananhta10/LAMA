import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanManagementSetupComponent } from './plan-management-setup.component';

describe('PlanManagementSetupComponent', () => {
  let component: PlanManagementSetupComponent;
  let fixture: ComponentFixture<PlanManagementSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanManagementSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanManagementSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
