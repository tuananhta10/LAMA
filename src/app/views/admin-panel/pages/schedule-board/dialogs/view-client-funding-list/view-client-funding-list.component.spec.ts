import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClientFundingListComponent } from './view-client-funding-list.component';

describe('ViewClientFundingListComponent', () => {
  let component: ViewClientFundingListComponent;
  let fixture: ComponentFixture<ViewClientFundingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewClientFundingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewClientFundingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
