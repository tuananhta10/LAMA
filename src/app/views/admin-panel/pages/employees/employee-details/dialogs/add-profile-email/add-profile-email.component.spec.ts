import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProfileEmailComponent } from './add-profile-email.component';

describe('AddProfileEmailComponent', () => {
  let component: AddProfileEmailComponent;
  let fixture: ComponentFixture<AddProfileEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProfileEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProfileEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
