import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainProfileComplianceCheckComponent } from './main-profile-compliance-check.component';

describe('MainProfileComplianceCheckComponent', () => {
  let component: MainProfileComplianceCheckComponent;
  let fixture: ComponentFixture<MainProfileComplianceCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainProfileComplianceCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainProfileComplianceCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
