import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareManagementMainComponent } from './care-management-main.component';

describe('CareManagementMainComponent', () => {
  let component: CareManagementMainComponent;
  let fixture: ComponentFixture<CareManagementMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareManagementMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CareManagementMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
