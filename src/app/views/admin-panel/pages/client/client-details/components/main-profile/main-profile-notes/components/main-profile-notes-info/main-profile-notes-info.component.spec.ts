import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainProfileNotesInfoComponent } from './main-profile-notes-info.component';

describe('MainProfileNotesInfoComponent', () => {
  let component: MainProfileNotesInfoComponent;
  let fixture: ComponentFixture<MainProfileNotesInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainProfileNotesInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainProfileNotesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
