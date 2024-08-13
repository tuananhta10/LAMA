import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableTableIncidentComponent } from './reusable-table-incident.component';

describe('ReusableTableIncidentComponent', () => {
  let component: ReusableTableIncidentComponent;
  let fixture: ComponentFixture<ReusableTableIncidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReusableTableIncidentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReusableTableIncidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
