import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareworkerTableReusableComponent } from './careworker-table-reusable.component';

describe('CareworkerTableReusableComponent', () => {
  let component: CareworkerTableReusableComponent;
  let fixture: ComponentFixture<CareworkerTableReusableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareworkerTableReusableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CareworkerTableReusableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
