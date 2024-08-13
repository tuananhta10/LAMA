import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareworkerClientsComponent } from './careworker-clients.component';

describe('CareworkerClientsComponent', () => {
  let component: CareworkerClientsComponent;
  let fixture: ComponentFixture<CareworkerClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareworkerClientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CareworkerClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
