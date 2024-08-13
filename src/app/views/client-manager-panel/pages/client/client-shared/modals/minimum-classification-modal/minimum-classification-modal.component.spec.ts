import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinimumClassificationModalComponent } from './minimum-classification-modal.component';

describe('MinimumClassificationModalComponent', () => {
  let component: MinimumClassificationModalComponent;
  let fixture: ComponentFixture<MinimumClassificationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinimumClassificationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinimumClassificationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
