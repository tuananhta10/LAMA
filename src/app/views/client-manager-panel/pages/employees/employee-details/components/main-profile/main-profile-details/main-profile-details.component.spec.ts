import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainProfileDetailsComponent } from './main-profile-details.component';

describe('MainProfileDetailsComponent', () => {
  let component: MainProfileDetailsComponent;
  let fixture: ComponentFixture<MainProfileDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainProfileDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainProfileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
