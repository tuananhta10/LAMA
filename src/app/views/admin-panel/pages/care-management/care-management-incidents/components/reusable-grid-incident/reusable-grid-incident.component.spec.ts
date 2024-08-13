import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableGridIncidentComponent } from './reusable-grid-incident.component';

describe('ReusableGridIncidentComponent', () => {
  let component: ReusableGridIncidentComponent;
  let fixture: ComponentFixture<ReusableGridIncidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReusableGridIncidentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReusableGridIncidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
