import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentGridViewComponent } from './incident-grid-view.component';

describe('IncidentGridViewComponent', () => {
  let component: IncidentGridViewComponent;
  let fixture: ComponentFixture<IncidentGridViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncidentGridViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentGridViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
