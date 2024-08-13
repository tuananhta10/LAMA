import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGeneratedClaimSchedulesComponent } from './view-generated-claim-schedules.component';

describe('ViewGeneratedClaimSchedulesComponent', () => {
  let component: ViewGeneratedClaimSchedulesComponent;
  let fixture: ComponentFixture<ViewGeneratedClaimSchedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewGeneratedClaimSchedulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGeneratedClaimSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
