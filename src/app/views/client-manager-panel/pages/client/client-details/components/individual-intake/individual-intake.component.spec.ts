import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualIntakeComponent } from './individual-intake.component';

describe('IndividualIntakeComponent', () => {
  let component: IndividualIntakeComponent;
  let fixture: ComponentFixture<IndividualIntakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualIntakeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualIntakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
