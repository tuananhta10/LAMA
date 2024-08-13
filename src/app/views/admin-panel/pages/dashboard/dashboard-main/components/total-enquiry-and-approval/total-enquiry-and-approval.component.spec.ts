import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalEnquiryAndApprovalComponent } from './total-enquiry-and-approval.component';

describe('TotalEnquiryAndApprovalComponent', () => {
  let component: TotalEnquiryAndApprovalComponent;
  let fixture: ComponentFixture<TotalEnquiryAndApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalEnquiryAndApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalEnquiryAndApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
