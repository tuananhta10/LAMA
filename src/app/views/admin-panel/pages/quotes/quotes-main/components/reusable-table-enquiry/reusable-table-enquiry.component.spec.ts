import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableTableEnquiryComponent } from './reusable-table-enquiry.component';

describe('ReusableTableEnquiryComponent', () => {
  let component: ReusableTableEnquiryComponent;
  let fixture: ComponentFixture<ReusableTableEnquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReusableTableEnquiryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReusableTableEnquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
