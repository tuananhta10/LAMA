import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareworkerTableComponent } from './careworker-table.component';

describe('CareworkerTableComponent', () => {
  let component: CareworkerTableComponent;
  let fixture: ComponentFixture<CareworkerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareworkerTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CareworkerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
