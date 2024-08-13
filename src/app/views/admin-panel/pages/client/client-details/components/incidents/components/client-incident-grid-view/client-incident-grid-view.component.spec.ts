import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientIncidentGridViewComponent } from './client-incident-grid-view.component';

describe('ClientIncidentGridViewComponent', () => {
  let component: ClientIncidentGridViewComponent;
  let fixture: ComponentFixture<ClientIncidentGridViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientIncidentGridViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientIncidentGridViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
