import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainProfileStatsComponent } from './main-profile-stats.component';

describe('MainProfileStatsComponent', () => {
  let component: MainProfileStatsComponent;
  let fixture: ComponentFixture<MainProfileStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainProfileStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainProfileStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
