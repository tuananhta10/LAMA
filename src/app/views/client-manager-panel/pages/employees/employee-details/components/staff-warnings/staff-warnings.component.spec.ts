import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffWarningsComponent } from './staff-warnings.component';

describe('StaffWarningsComponent', () => {
  let component: StaffWarningsComponent;
  let fixture: ComponentFixture<StaffWarningsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffWarningsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffWarningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
