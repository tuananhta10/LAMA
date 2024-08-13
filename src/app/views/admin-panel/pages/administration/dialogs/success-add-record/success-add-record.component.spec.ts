import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessAddRecordComponent } from './success-add-record.component';

describe('SuccessAddRecordComponent', () => {
  let component: SuccessAddRecordComponent;
  let fixture: ComponentFixture<SuccessAddRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessAddRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessAddRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
