import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SosNumbersComponent } from './sos-numbers.component';

describe('SosNumbersComponent', () => {
  let component: SosNumbersComponent;
  let fixture: ComponentFixture<SosNumbersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SosNumbersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SosNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
