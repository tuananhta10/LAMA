import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionRecordComponent } from './admission-record.component';

describe('AdmissionRecordComponent', () => {
  let component: AdmissionRecordComponent;
  let fixture: ComponentFixture<AdmissionRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmissionRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmissionRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
