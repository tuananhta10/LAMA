import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignCareworkerComponent } from './assign-careworker.component';

describe('AssignCareworkerComponent', () => {
  let component: AssignCareworkerComponent;
  let fixture: ComponentFixture<AssignCareworkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignCareworkerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignCareworkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
