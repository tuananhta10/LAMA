import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UndoCompleteComponent } from './undo-complete.component';

describe('UndoCompleteComponent', () => {
  let component: UndoCompleteComponent;
  let fixture: ComponentFixture<UndoCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UndoCompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UndoCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
