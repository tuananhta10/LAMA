import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainProfileDocumentsComponent } from './main-profile-documents.component';

describe('MainProfileDocumentsComponent', () => {
  let component: MainProfileDocumentsComponent;
  let fixture: ComponentFixture<MainProfileDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainProfileDocumentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainProfileDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
