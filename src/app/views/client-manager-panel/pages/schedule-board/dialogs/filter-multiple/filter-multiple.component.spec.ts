import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterMultipleComponent } from './filter-multiple.component';

describe('FilterMultipleComponent', () => {
  let component: FilterMultipleComponent;
  let fixture: ComponentFixture<FilterMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterMultipleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
