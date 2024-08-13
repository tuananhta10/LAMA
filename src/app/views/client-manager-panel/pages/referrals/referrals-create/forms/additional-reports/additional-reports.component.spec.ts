import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalReportsComponent } from './additional-reports.component';

describe('AdditionalReportsComponent', () => {
  let component: AdditionalReportsComponent;
  let fixture: ComponentFixture<AdditionalReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
