import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeListFeedComponent } from './employee-list-feed.component';

describe('EmployeeListFeedComponent', () => {
  let component: EmployeeListFeedComponent;
  let fixture: ComponentFixture<EmployeeListFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeListFeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeListFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
