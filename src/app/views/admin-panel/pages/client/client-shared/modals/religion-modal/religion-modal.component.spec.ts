import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReligionModalComponent } from './religion-modal.component';

describe('ReligionModalComponent', () => {
  let component: ReligionModalComponent;
  let fixture: ComponentFixture<ReligionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReligionModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReligionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
