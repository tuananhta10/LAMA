import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddListOfInterestsComponent } from './add-list-of-interests.component';

describe('AddListOfInterestsComponent', () => {
  let component: AddListOfInterestsComponent;
  let fixture: ComponentFixture<AddListOfInterestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddListOfInterestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddListOfInterestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
