import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantFundingListViewComponent } from './participant-funding-list-view.component';

describe('ParticipantFundingListViewComponent', () => {
  let component: ParticipantFundingListViewComponent;
  let fixture: ComponentFixture<ParticipantFundingListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipantFundingListViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantFundingListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
