import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalLoggedComponent } from './approval-logged.component';

describe('ApprovalLoggedComponent', () => {
  let component: ApprovalLoggedComponent;
  let fixture: ComponentFixture<ApprovalLoggedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovalLoggedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalLoggedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
