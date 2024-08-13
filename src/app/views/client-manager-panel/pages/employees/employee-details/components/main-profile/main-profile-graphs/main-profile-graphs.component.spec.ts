import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainProfileGraphsComponent } from './main-profile-graphs.component';

describe('MainProfileGraphsComponent', () => {
  let component: MainProfileGraphsComponent;
  let fixture: ComponentFixture<MainProfileGraphsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainProfileGraphsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainProfileGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
