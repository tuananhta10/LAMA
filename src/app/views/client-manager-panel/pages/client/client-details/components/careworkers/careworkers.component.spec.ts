import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareworkersComponent } from './careworkers.component';

describe('CareworkersComponent', () => {
  let component: CareworkersComponent;
  let fixture: ComponentFixture<CareworkersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareworkersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CareworkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
