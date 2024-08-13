import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareworkerSignupComponent } from './careworker-signup.component';

describe('CareworkerSignupComponent', () => {
  let component: CareworkerSignupComponent;
  let fixture: ComponentFixture<CareworkerSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareworkerSignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CareworkerSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
