import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalSearchMainComponent } from './global-search-main.component';

describe('GlobalSearchMainComponent', () => {
  let component: GlobalSearchMainComponent;
  let fixture: ComponentFixture<GlobalSearchMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalSearchMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalSearchMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
