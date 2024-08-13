import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareworkerComponent } from './careworker.component';

describe('CareworkerComponent', () => {
  let component: CareworkerComponent;
  let fixture: ComponentFixture<CareworkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareworkerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CareworkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
