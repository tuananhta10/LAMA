import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientGoalModalComponent } from './client-goal-modal.component';

describe('ClientGoalModalComponent', () => {
  let component: ClientGoalModalComponent;
  let fixture: ComponentFixture<ClientGoalModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientGoalModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientGoalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
