import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainProfileNotesComponent } from './main-profile-notes.component';

describe('MainProfileNotesComponent', () => {
  let component: MainProfileNotesComponent;
  let fixture: ComponentFixture<MainProfileNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainProfileNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainProfileNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
