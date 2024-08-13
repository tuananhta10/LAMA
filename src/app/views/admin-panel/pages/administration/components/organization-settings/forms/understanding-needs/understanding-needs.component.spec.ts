import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderstandingNeedsComponent } from './understanding-needs.component';

describe('UnderstandingNeedsComponent', () => {
  let component: UnderstandingNeedsComponent;
  let fixture: ComponentFixture<UnderstandingNeedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnderstandingNeedsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderstandingNeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
