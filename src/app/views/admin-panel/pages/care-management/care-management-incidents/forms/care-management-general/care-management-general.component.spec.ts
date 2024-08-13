import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareManagementGeneralComponent } from './care-management-general.component';

describe('CareManagementGeneralComponent', () => {
  let component: CareManagementGeneralComponent;
  let fixture: ComponentFixture<CareManagementGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareManagementGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CareManagementGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
