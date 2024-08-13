import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableListViewComponent } from './reusable-list-view.component';

describe('ReusableListViewComponent', () => {
  let component: ReusableListViewComponent;
  let fixture: ComponentFixture<ReusableListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReusableListViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReusableListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
