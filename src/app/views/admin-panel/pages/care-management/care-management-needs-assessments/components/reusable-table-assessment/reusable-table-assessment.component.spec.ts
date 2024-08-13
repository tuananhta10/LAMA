import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableTableAssessmentComponent } from './reusable-table-assessment.component';

describe('ReusableTableAssessmentComponent', () => {
  let component: ReusableTableAssessmentComponent;
  let fixture: ComponentFixture<ReusableTableAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReusableTableAssessmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReusableTableAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
