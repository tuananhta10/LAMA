import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicationClientNotesComponent } from './medication-client-notes.component';

describe('MedicationClientNotesComponent', () => {
  let component: MedicationClientNotesComponent;
  let fixture: ComponentFixture<MedicationClientNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicationClientNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicationClientNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
