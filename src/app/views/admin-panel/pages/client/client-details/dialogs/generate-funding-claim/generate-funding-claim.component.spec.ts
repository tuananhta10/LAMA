import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateFundingClaimComponent } from './generate-funding-claim.component';

describe('GenerateFundingClaimComponent', () => {
  let component: GenerateFundingClaimComponent;
  let fixture: ComponentFixture<GenerateFundingClaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateFundingClaimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateFundingClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
