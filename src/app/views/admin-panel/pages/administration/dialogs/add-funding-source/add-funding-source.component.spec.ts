import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFundingSourceComponent } from './add-funding-source.component';

describe('AddFundingSourceComponent', () => {
  let component: AddFundingSourceComponent;
  let fixture: ComponentFixture<AddFundingSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFundingSourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFundingSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
