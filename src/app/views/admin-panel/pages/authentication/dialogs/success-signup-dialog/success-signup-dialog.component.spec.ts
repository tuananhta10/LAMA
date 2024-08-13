import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessSignupDialogComponent } from './success-signup-dialog.component';

describe('SuccessSignupDialogComponent', () => {
  let component: SuccessSignupDialogComponent;
  let fixture: ComponentFixture<SuccessSignupDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessSignupDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessSignupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
