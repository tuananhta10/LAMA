import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMedicalHistoryComponent } from './add-medical-history.component';

describe('AddMedicalHistoryComponent', () => {
  let component: AddMedicalHistoryComponent;
  let fixture: ComponentFixture<AddMedicalHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMedicalHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMedicalHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
