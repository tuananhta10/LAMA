import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfInterestsComponent } from './list-of-interests.component';

describe('ListOfInterestsComponent', () => {
  let component: ListOfInterestsComponent;
  let fixture: ComponentFixture<ListOfInterestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfInterestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfInterestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
