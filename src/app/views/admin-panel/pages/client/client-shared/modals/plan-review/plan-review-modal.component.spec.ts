import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanReviewModalComponent } from './plan-review-modal.component';

describe('PlanReviewModalComponent', () => {
  let component: PlanReviewModalComponent;
  let fixture: ComponentFixture<PlanReviewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanReviewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanReviewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
