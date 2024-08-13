import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareManagementIncidentsComponent } from './care-management-incidents.component';

describe('CareManagementIncidentsComponent', () => {
  let component: CareManagementIncidentsComponent;
  let fixture: ComponentFixture<CareManagementIncidentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareManagementIncidentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CareManagementIncidentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
