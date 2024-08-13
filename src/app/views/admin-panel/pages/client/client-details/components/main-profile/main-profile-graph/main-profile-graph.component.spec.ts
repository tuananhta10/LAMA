import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainProfileGraphComponent } from './main-profile-graph.component';

describe('MainProfileGraphComponent', () => {
  let component: MainProfileGraphComponent;
  let fixture: ComponentFixture<MainProfileGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainProfileGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainProfileGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
