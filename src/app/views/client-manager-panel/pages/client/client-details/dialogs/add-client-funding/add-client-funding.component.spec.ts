import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClientFundingComponent } from './add-client-funding.component';

describe('AddClientFundingComponent', () => {
  let component: AddClientFundingComponent;
  let fixture: ComponentFixture<AddClientFundingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddClientFundingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClientFundingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
