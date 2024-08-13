import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProfileSmsComponent } from './add-profile-sms.component';

describe('AddProfileSmsComponent', () => {
  let component: AddProfileSmsComponent;
  let fixture: ComponentFixture<AddProfileSmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProfileSmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProfileSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
