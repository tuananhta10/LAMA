import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecalculateComponent } from './recalculate.component';

describe('RecalculateComponent', () => {
  let component: RecalculateComponent;
  let fixture: ComponentFixture<RecalculateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecalculateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecalculateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
