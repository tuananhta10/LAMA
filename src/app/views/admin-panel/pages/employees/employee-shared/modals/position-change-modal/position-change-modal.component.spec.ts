import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionChangeModalComponent } from './position-change-modal.component';

describe('PositionChangeModalComponent', () => {
  let component: PositionChangeModalComponent;
  let fixture: ComponentFixture<PositionChangeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PositionChangeModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionChangeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
