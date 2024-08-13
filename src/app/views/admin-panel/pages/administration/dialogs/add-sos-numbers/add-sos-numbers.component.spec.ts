import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSosNumbersComponent } from './add-sos-numbers.component';

describe('AddSosNumbersComponent', () => {
  let component: AddSosNumbersComponent;
  let fixture: ComponentFixture<AddSosNumbersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSosNumbersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSosNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
