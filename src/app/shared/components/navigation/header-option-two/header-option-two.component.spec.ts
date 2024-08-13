import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderOptionTwoComponent } from './header-option-two.component';

describe('HeaderOptionTwoComponent', () => {
  let component: HeaderOptionTwoComponent;
  let fixture: ComponentFixture<HeaderOptionTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderOptionTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderOptionTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
