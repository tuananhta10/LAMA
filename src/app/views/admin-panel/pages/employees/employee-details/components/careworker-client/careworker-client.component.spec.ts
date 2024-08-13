import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareworkerClientComponent } from './careworker-client.component';

describe('CareworkerClientComponent', () => {
  let component: CareworkerClientComponent;
  let fixture: ComponentFixture<CareworkerClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareworkerClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CareworkerClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
