import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateClientGoalModalComponent } from './create-client-goal-modal.component';

describe('CreateClientGoalModalComponent', () => {
  let component: CreateClientGoalModalComponent;
  let fixture: ComponentFixture<CreateClientGoalModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateClientGoalModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateClientGoalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
