import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareManagementActionsTakenComponent } from './care-management-actions-taken.component';

describe('CareManagementActionsTakenComponent', () => {
  let component: CareManagementActionsTakenComponent;
  let fixture: ComponentFixture<CareManagementActionsTakenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareManagementActionsTakenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CareManagementActionsTakenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
