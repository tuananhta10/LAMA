import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundingCodeComponent } from './funding-code-modal.component';

describe('FundingCodeComponent', () => {
  let component: FundingCodeComponent;
  let fixture: ComponentFixture<FundingCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundingCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FundingCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
