import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderOptionThreeComponent } from './header-option-three.component';

describe('HeaderOptionThreeComponent', () => {
  let component: HeaderOptionThreeComponent;
  let fixture: ComponentFixture<HeaderOptionThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderOptionThreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderOptionThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
