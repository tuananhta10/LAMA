import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableGridViewComponent } from './reusable-grid-view.component';

describe('ReusableGridViewComponent', () => {
  let component: ReusableGridViewComponent;
  let fixture: ComponentFixture<ReusableGridViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReusableGridViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReusableGridViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
