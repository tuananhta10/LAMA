import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupInitComponent } from './signup-init.component';

describe('SignupInitComponent', () => {
  let component: SignupInitComponent;
  let fixture: ComponentFixture<SignupInitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupInitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
