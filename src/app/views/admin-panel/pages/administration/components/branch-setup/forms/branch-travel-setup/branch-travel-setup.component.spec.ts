import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchTravelSetupComponent } from './branch-travel-setup.component';

describe('BranchTravelSetupComponent', () => {
  let component: BranchTravelSetupComponent;
  let fixture: ComponentFixture<BranchTravelSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchTravelSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchTravelSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
