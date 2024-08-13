import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeListBannerComponent } from './employee-list-banner.component';

describe('EmployeeListBannerComponent', () => {
  let component: EmployeeListBannerComponent;
  let fixture: ComponentFixture<EmployeeListBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeListBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeListBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
